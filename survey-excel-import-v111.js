/* PC Excel creation. Import drafts share the existing survey lifecycle and IDs. */
(function () {
  'use strict';
  const VERSION = 1, MAX_BYTES = 5 * 1024 * 1024;
  const SHEETS = ['基本信息', '问卷内容'];
  const HEADERS = {基本信息: ['字段', '内容'], 问卷内容: ['题号', '题型', '题目标题', '是否必填', '选项'], 填写说明: ['填写项目', '规则与示例']};
  const LEGACY_BASIC_HEADERS = ['字段', '内容', '填写要求', '填写示例（不导入）'];
  const LEGACY_TEMPLATE_HEADERS = ['题号（必填）', '题目类型（必填）', '题目标题（必填）', '是否必填（必填）', '选项（单选、多选必填）'];
  const LEGACY_COLUMN_HEADERS = [...LEGACY_TEMPLATE_HEADERS.slice(0, 4), ...Array.from({length: 20}, (_, index) => `选项${index + 1}（${index < 2 ? '选择题必填' : '非必填'}）`)];
  const TEMPLATE_HEADERS = {基本信息: ['字段', '内容', '填写要求'], 问卷内容: [...LEGACY_TEMPLATE_HEADERS.slice(0, 4), ...Array.from({length: 20}, (_, index) => `选项${index + 1}${index < 2 ? '（选择题必填）' : ''}`)]};
  const BASIC_FIELD_NAMES = {'问卷名称': '问卷名称', '问卷名称（必填）': '问卷名称', '问卷类型': '问卷类型', '问卷类型（必填）': '问卷类型', '问卷说明': '问卷说明', '问卷说明（非必填）': '问卷说明'};
  const TYPES = ['填空', '单选', '多选', '日期', '文件/图片', '签名', '位置'];
  const clone = value => typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value));
  const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character]));
  const errorRow = (sheet, row, column, message) => ({sheet, row: row || '', column: column || '', message, field: column || '', reason: message});
  const imported = survey => survey?.creationSource === 'excel' && survey.excelImportVersion === VERSION;
  let dialog = null, generation = 0, transactionDepth = 0, installed = false, restoring = false, loadAdapter = null, creationSessionId = null;
  const persisted = new Map();

  function track(event, details = {}) {
    const record = {event: event.startsWith('survey_') ? event : `survey_${event}`, portal: state.portal, device: state.preview, org: CONFIG[state.portal]?.org || '',
      user_id: typeof currentRecipientPersonId === 'function' ? currentRecipientPersonId() : '', template_version: 'V1.11', timestamp: typeof formatSystemTime === 'function' ? formatSystemTime() : new Date().toISOString(), ...details};
    window.__surveyExcelEvents = window.__surveyExcelEvents || [];
    window.__surveyExcelEvents.push(record);
    return record;
  }
  function storageKey(portal = state.portal) {
    const config = CONFIG[portal];
    if (!config) throw new Error('当前组织不可用');
    return `survey-excel-v111:${portal}:${encodeURIComponent(config.org)}:${encodeURIComponent(config.user)}`;
  }
  function owns(survey, portal) {
    return imported(survey) && survey.owner === CONFIG[portal]?.user.split(' · ')[0];
  }
  function serialized(portal, records = CONFIG[portal].surveys.filter(survey => owns(survey, portal))) {
    return JSON.stringify({version: VERSION, portal, org: CONFIG[portal].org, user: CONFIG[portal].user, records});
  }
  function persistAll() {
    if (restoring) return;
    const changes = Object.keys(CONFIG).map(portal => ({portal, key: storageKey(portal), value: serialized(portal)}))
      .filter(item => item.value !== persisted.get(item.key) && (CONFIG[item.portal].surveys.some(survey => owns(survey, item.portal)) || persisted.has(item.key)));
    const written = [];
    try {
      changes.forEach(item => {
        const previous = localStorage.getItem(item.key);
        localStorage.setItem(item.key, item.value);
        written.push({...item, previous});
      });
    } catch (error) {
      written.reverse().forEach(item => { try { item.previous == null ? localStorage.removeItem(item.key) : localStorage.setItem(item.key, item.previous); } catch {} });
      throw new Error('草稿保存失败，请检查浏览器存储空间后重试');
    }
    changes.forEach(item => persisted.set(item.key, item.value));
  }
  function restorePersisted() {
    restoring = true;
    try {
      Object.keys(CONFIG).forEach(portal => {
        const key = storageKey(portal);
        let raw;
        try { raw = localStorage.getItem(key); } catch { return; }
        if (!raw) return;
        try {
          const saved = JSON.parse(raw);
          if (saved.version !== VERSION || saved.portal !== portal || saved.org !== CONFIG[portal].org || saved.user !== CONFIG[portal].user || !Array.isArray(saved.records)) throw new Error('schema');
          const ids = new Set();
          const rows = saved.records.filter(survey => {
            const valid = owns(survey, portal) && Number.isSafeInteger(survey.id) && survey.id > 0 && !ids.has(survey.id)
              && ['draft', 'not_started', 'running', 'paused', 'ended'].includes(survey.status)
              && typeof survey.title === 'string' && Array.isArray(survey.questions) && survey.questions.length > 0 && survey.questions.length <= 100;
            if (valid) ids.add(survey.id);
            return valid;
          });
          rows.forEach(savedSurvey => {
            const index = CONFIG[portal].surveys.findIndex(survey => survey.id === savedSurvey.id);
            if (index < 0) CONFIG[portal].surveys.unshift(clone(savedSurvey));
            else if (owns(CONFIG[portal].surveys[index], portal)) Object.assign(CONFIG[portal].surveys[index], clone(savedSurvey));
          });
          persisted.set(key, serialized(portal));
        } catch {
          track('excel_draft_restore_failed', {restore_portal: portal, reason: 'invalid_storage'});
        }
      });
    } finally { restoring = false; }
  }
  function snapshot() {
    return {state: typeof structuredClone === 'function' ? structuredClone(state) : cloneState(state),
      records: Object.fromEntries(Object.entries(CONFIG).map(([portal, config]) => [portal, config.surveys.map(survey => ({reference: survey, value: clone(survey)}))]))};
  }
  function cloneState(value) {
    if (value instanceof Map) return new Map([...value].map(([key, item]) => [key, cloneState(item)]));
    if (value instanceof Set) return new Set([...value].map(cloneState));
    if (Array.isArray(value)) return value.map(cloneState);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cloneState(item)]));
    return value;
  }
  function rollback(saved) {
    Object.keys(state).forEach(key => { if (!Object.hasOwn(saved.state, key)) delete state[key]; });
    Object.assign(state, saved.state);
    Object.entries(saved.records).forEach(([portal, rows]) => {
      rows.forEach(({reference, value}) => {
        Object.keys(reference).forEach(key => { if (!Object.hasOwn(value, key)) delete reference[key]; });
        Object.assign(reference, value);
      });
      CONFIG[portal].surveys.splice(0, CONFIG[portal].surveys.length, ...rows.map(row => row.reference));
    });
  }
  function transaction(action, rethrow = false) {
    if (transactionDepth) return action();
    const before = snapshot(), messages = [], originalToast = toast;
    transactionDepth++;
    toast = message => messages.push(message);
    try {
      const result = action();
      persistAll();
      toast = originalToast;
      messages.forEach(message => originalToast(message));
      return result;
    } catch (error) {
      rollback(before);
      toast = originalToast;
      track('excel_draft_save_failed', {reason: 'storage_or_save'});
      if (rethrow) throw error;
      if (state.portal) renderShell();
      originalToast(error.message || '草稿保存失败，请重试');
      return false;
    } finally { toast = originalToast; transactionDepth--; }
  }
  function macroWorkbook(book) {
    return Boolean(book?.vbaraw?.length
      || Object.values(book?.Sheets || {}).some(sheet => sheet['!type'] === 'macro')
      || (book?.keys || Object.keys(book?.files || {})).some(key => /vbaProject|macrosheets|xl\/intlmacrosheets/i.test(key)));
  }
  function installLoadAdapter() {
    if (typeof loadEditableSurveyState !== 'function' || loadEditableSurveyState === loadAdapter) return;
    const baseLoad = loadEditableSurveyState;
    loadAdapter = function (survey) { const result = baseLoad(survey); if (imported(survey)) state.draftDescription = survey.description || ''; return result; };
    loadEditableSurveyState = loadAdapter;
  }
  function readRows(sheet, name, width, errors, metadata = new Set()) {
    const rows = new Map(), cells = Object.keys(sheet || {}).filter(key => /^[A-Z]+[1-9][0-9]*$/.test(key));
    if (cells.length > 20000) { errors.push(errorRow(name, '', '', '工作表内容超出模板容量')); return []; }
    cells.forEach(address => {
      const cell = sheet[address], coordinate = XLSX.utils.decode_cell(address), value = cell?.v == null ? '' : String(cell.v).trim();
      if (cell?.f) errors.push(errorRow(name, coordinate.r + 1, address.replace(/[0-9]/g, ''), '不支持公式，请粘贴为文本或数值'));
      if (metadata.has(address)) return;
      if (!value) return;
      if (coordinate.c >= width) { errors.push(errorRow(name, coordinate.r + 1, address.replace(/[0-9]/g, ''), '存在模板以外的列，请使用下载模板')); return; }
      if (!rows.has(coordinate.r)) rows.set(coordinate.r, Array(width).fill(''));
      rows.get(coordinate.r)[coordinate.c] = value;
    });
    return [...rows].sort((left, right) => left[0] - right[0]).map(([index, values]) => ({row: index + 1, values}));
  }
  function templateMetadataCells(book) {
    const cells = new Set(), sheet = book.Sheets.基本信息;
    for (const [name, column, heading] of [['SurveyImportTypes','AA','问卷类型选项'],['SurveyQuestionTypes','AB','题目类型选项'],['SurveyRequiredValues','AC','是否必填选项']]) {
      const names = (book.Workbook?.Names || []).filter(item => item.Name === name && item.Sheet == null);
      if (names.length !== 1 || String(sheet[`${column}1`]?.v || '') !== heading) continue;
      const ref = String(names[0].Ref || '').replace(/^=/, ''), match = ref.match(/^(?:'基本信息'|基本信息)!\$?([A-Z]+)\$?2:\$?([A-Z]+)\$?([0-9]+)$/);
      if (!match || match[1] !== column || match[2] !== column || Number(match[3]) < 2 || Number(match[3]) > 20000) continue;
      for (let row = 1; row <= Number(match[3]); row++) cells.add(`${column}${row}`);
    }
    return cells;
  }
  function parseWorkbook(book, options = {}) {
    const portal = options.portal || state.portal, errors = [];
    if (!CONFIG[portal]) return {ok: false, errors: [errorRow('文件', '', '', '当前端不可用')]};
    if (macroWorkbook(book)) return {ok: false, errors: [errorRow('文件', '', '', '不支持含宏的 Excel 文件，请使用无宏模板')]};
    if (!book || !Array.isArray(book.SheetNames) || ![2,3].includes(book.SheetNames.length) || new Set(book.SheetNames).size !== book.SheetNames.length || SHEETS.some(name => !book.SheetNames.includes(name) || !book.Sheets?.[name]) || book.SheetNames.some(name => ![...SHEETS,'填写说明'].includes(name))) {
      return {ok: false, errors: [errorRow('文件', '', '', '模板结构错误，必须包含“基本信息”“问卷内容”；兼容保留“填写说明”的旧版模版')]};
    }
    if (book.SheetNames.includes('填写说明') && (!book.Sheets?.填写说明 || HEADERS.填写说明.some((value,index) => String(book.Sheets.填写说明[XLSX.utils.encode_cell({r:0,c:index})]?.v || '').trim() !== value))) {
      errors.push(errorRow('填写说明', 1, '表头', '旧版填写说明表头必须为填写项目、规则与示例'));
    }
    const data = {};
    let basicLabels = [];
    let columnOptions = false;
    SHEETS.forEach(name => {
      const headers = HEADERS[name];
      const sheet = book.Sheets[name], displayed = TEMPLATE_HEADERS[name];
      const matchesHeader = expected => expected.every((value, index) => String(sheet[XLSX.utils.encode_cell({r: 0, c: index})]?.v || '').trim() === value);
      const schemas = name === '基本信息' ? [LEGACY_BASIC_HEADERS, displayed, headers] : [displayed, LEGACY_COLUMN_HEADERS, LEGACY_TEMPLATE_HEADERS, headers];
      const accepted = schemas.find(matchesHeader);
      if (name === '基本信息') {
        basicLabels = accepted?.length === 4 ? ['问卷名称（必填）','问卷类型（必填）','问卷说明（非必填）'] : accepted?.length === 3 ? ['问卷名称（必填）','问卷类型（必填）','问卷说明'] : ['问卷名称','问卷类型','问卷说明'];
      }
      if (name === '问卷内容') columnOptions = accepted?.length === 24;
      const metadata = name === '基本信息' && accepted?.length === 3 ? templateMetadataCells(book) : new Set();
      const rows = readRows(sheet, name, (accepted || headers).length, errors, metadata), header = rows.find(row => row.row === 1);
      if (!header || !accepted) errors.push(errorRow(name, 1, '表头', `请保留下载模版表头；兼容原表头：${headers.join('、')}`));
      if (book.Sheets[name]['!merges']?.length) errors.push(errorRow(name, '', '', '数据工作表不支持合并单元格'));
      data[name] = rows.filter(row => row.row > 1);
    });
    const basic = {}, allowed = ['问卷名称', '问卷类型', '问卷说明'];
    data.基本信息.forEach(({row, values}) => {
      const [displayedField, value] = values, field = BASIC_FIELD_NAMES[displayedField];
      if (!basicLabels.includes(displayedField)) {
        errors.push(errorRow('基本信息', row, '字段', '请保留当前模板基本信息字段名称及必填标识，不混用新旧字段')); return;
      }
      if (!allowed.includes(field)) { errors.push(errorRow('基本信息', row, '字段', '字段必须为问卷名称、问卷类型或问卷说明')); return; }
      if (basic[field]) { errors.push(errorRow('基本信息', row, '字段', '字段重复')); return; }
      basic[field] = {value, row};
    });
    allowed.forEach(field => { if (!basic[field]) errors.push(errorRow('基本信息', '', field, '缺少模板字段')); });
    const title = basic.问卷名称?.value || '', description = basic.问卷说明?.value || '', typeName = basic.问卷类型?.value || '';
    if (!title || title.length > 50) errors.push(errorRow('基本信息', basic.问卷名称?.row, '问卷名称', '必填，长度为 1～50 个字符'));
    if (description.length > 500) errors.push(errorRow('基本信息', basic.问卷说明?.row, '问卷说明', '最多 500 个字符'));
    const types = CONFIG[portal].surveyTypes.filter(type => type.name === typeName);
    if (!typeName || types.length !== 1) errors.push(errorRow('基本信息', basic.问卷类型?.row, '问卷类型', !typeName ? '请选择当前端有效的问卷类型名称' : types.length > 1 ? '问卷类型名称不唯一，请联系管理员' : '问卷类型不存在或已失效，请填写当前端有效名称'));
    const questions = [], numbers = new Set(), contentRows = data.问卷内容;
    if (!contentRows.length || contentRows.length > 100) errors.push(errorRow('问卷内容', '', '题量', '单份问卷必须包含 1～100 道题'));
    contentRows.forEach(({row, values}) => {
      const [numberText, type, questionTitle, requiredText, ...optionCells] = values, number = Number(numberText);
      if (!/^[1-9][0-9]*$/.test(numberText) || number > 100) errors.push(errorRow('问卷内容', row, '题号', '题号必须为 1～100 的整数'));
      else if (numbers.has(number)) errors.push(errorRow('问卷内容', row, '题号', '题号重复'));
      numbers.add(number);
      if (!TYPES.includes(type)) errors.push(errorRow('问卷内容', row, '题型', `仅支持：${TYPES.join('、')}`));
      if (!['是', '否'].includes(requiredText)) errors.push(errorRow('问卷内容', row, '是否必填', '必须填写“是”或“否”'));
      const choice = ['单选', '多选'].includes(type), optionText = optionCells[0] || '';
      const lastOption = optionCells.reduce((last, value, index) => value ? index : last, -1);
      const optionsList = columnOptions ? optionCells.slice(0, lastOption + 1) : optionText ? optionText.split(/\r?\n/).map(value => value.trim()) : [];
      const problem = typeof questionValidationError === 'function' ? questionValidationError(questionTitle, type, optionsList) : '';
      if (problem) errors.push(errorRow('问卷内容', row, choice && /选项/.test(problem) ? '选项' : '题目标题', problem));
      if (choice && columnOptions) optionsList.forEach((value, index) => {
        if (!value) errors.push(errorRow('问卷内容', row, `选项${index + 1}`, '请从选项1开始连续填写，不得跳过中间选项'));
        if (/[\r\n]/.test(value)) errors.push(errorRow('问卷内容', row, `选项${index + 1}`, '每个选项单独填写一格，请将下一选项移至右侧列'));
        if (value.length > 50) errors.push(errorRow('问卷内容', row, `选项${index + 1}`, '每个选项最多50个字符'));
      });
      if (choice && !columnOptions && optionsList.some(value => !value)) errors.push(errorRow('问卷内容', row, '选项', '选项不得包含空白行'));
      if (!choice && (columnOptions ? lastOption >= 0 : optionText)) errors.push(errorRow('问卷内容', row, '选项', '非选择题的选项必须全部留空'));
      questions.push({id: `excel-row-${number}`, number, type, title: questionTitle, required: requiredText === '是',
        options: choice ? optionsList : [], imageOnly: false, includeTime: false, jumpEnabled: false, jumpRules: []});
    });
    if (contentRows.length && [...numbers].some(number => !Number.isInteger(number) || number < 1 || number > contentRows.length) || numbers.size !== contentRows.length) {
      errors.push(errorRow('问卷内容', '', '题号', '题号必须从 1 开始连续编号且不重复'));
    }
    if (errors.length) return {ok: false, errors};
    questions.sort((left, right) => left.number - right.number).forEach(question => { delete question.number; });
    const basicValue = {title, description, surveyTypeId: types[0].id, surveyTypeName: types[0].name};
    return {ok: true, errors: [], value: {...basicValue, questions}, basic: basicValue, questions};
  }
  function buildTemplateWorkbook(portal = state.portal) {
    if (typeof XLSX === 'undefined') throw new Error('Excel 组件加载失败，请刷新后重试');
    const currentTypes = CONFIG[portal]?.surveyTypes?.map(type => type.name).filter(Boolean) || [];
    if (!currentTypes.length) throw new Error('当前端暂无有效问卷类型，请先维护问卷类型');
    const examples = [
      [1, '填空', '请填写您所在的教研组', '是', ''],
      [2, '单选', '您最希望采用哪种培训方式？', '是', '线下集中培训', '线上直播培训', '自主学习'],
      [3, '多选', '您希望参加哪些培训主题？（可多选）', '否', '课堂教学', '信息技术', '班级管理', '心理健康'],
      [4, '日期', '您方便参加培训的日期', '否', ''],
      [5, '文件/图片', '请上传相关培训需求材料', '否', ''],
      [6, '签名', '请签字确认已阅读说明', '是', ''],
      [7, '位置', '请选择您所在的省市区', '否', ''],
    ];
    const book = XLSX.utils.book_new(), basic = XLSX.utils.aoa_to_sheet([
      TEMPLATE_HEADERS.基本信息,
      ['问卷名称（必填）', '教师培训需求调查（示例）', '必填，1～50个字符；请修改为实际问卷名称。'],
      ['问卷类型（必填）', currentTypes[0], '必填，请从本格下拉列表选择。'],
      ['问卷说明', '此为默认示例问卷，请按实际需求修改或删除示例题目。', '最多500个字符，可留空。'],
    ]);
    const content = XLSX.utils.aoa_to_sheet([TEMPLATE_HEADERS.问卷内容, ...examples]);
    content['!ref'] = 'A1:X101';
    XLSX.utils.sheet_add_aoa(basic, [['问卷类型选项','题目类型选项','是否必填选项']], {origin: 'AA1'});
    currentTypes.forEach((name, index) => XLSX.utils.sheet_add_aoa(basic, [[name]], {origin: `AA${index + 2}`}));
    TYPES.forEach((name, index) => XLSX.utils.sheet_add_aoa(basic, [[name]], {origin: `AB${index + 2}`}));
    XLSX.utils.sheet_add_aoa(basic, [['是'],['否']], {origin:'AC2'});
    basic['!cols'] = [{wch: 25}, {wch: 43}, {wch: 45}, ...Array.from({length:26},()=>({hidden:true}))];
    content['!cols'] = [{wch: 11}, {wch: 18}, {wch: 42}, {wch: 16}, ...Array.from({length:20},()=>({wch:20}))];
    book.Workbook = {Names: [
      {Name:'SurveyImportTypes',Ref:`'基本信息'!$AA$2:$AA$${currentTypes.length+1}`},
      {Name:'SurveyQuestionTypes',Ref:"'基本信息'!$AB$2:$AB$8"},
      {Name:'SurveyRequiredValues',Ref:"'基本信息'!$AC$2:$AC$3"},
    ]};
    [basic, content].forEach((sheet, index) => XLSX.utils.book_append_sheet(book, sheet, SHEETS[index]));
    return book;
  }
  function buildTemplateBytes(portal = state.portal) {
    // SheetJS CE omits native validations. Patch the resulting OOXML through its public ZIP API.
    const book = buildTemplateWorkbook(portal), zip = XLSX.CFB.read(new Uint8Array(XLSX.write(book,{type:'array',bookType:'xlsx',compression:true})),{type:'array'});
    const encoder = new TextEncoder(), decoder = new TextDecoder();
    const read = path => { const file=XLSX.CFB.find(zip,`/${path}`);if(!file)throw new Error('模板生成失败，请重试');return decoder.decode(file.content); };
    const write = (path,value) => XLSX.CFB.utils.cfb_add(zip,`/${path}`,encoder.encode(value));
    const xml = value => String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
    const emphasizeRequired = (source, sheet) => source.replace(/<c\b([^>]*[^/>])>[\s\S]*?<\/c>/g, (cell, attrs) => {
      const address = attrs.match(/\br="([A-Z]+[0-9]+)"/)?.[1], value = sheet[address]?.v;
      if (typeof value !== 'string') return cell;
      const ranges = [];
      for (const match of value.matchAll(/[（(]([^）)]*)[）)]/g)) {
        if (match[1].includes('非必填')) continue;
        for (const required of match[1].matchAll(/必填/g)) ranges.push(match.index + 1 + required.index);
      }
      if (!ranges.length) return cell;
      const bold = /\bs="1"/.test(attrs) ? '<b/>' : '';
      const run = (text,color) => `<r><rPr><rFont val="Microsoft YaHei"/>${bold}<sz val="11"/><color rgb="${color}"/></rPr><t xml:space="preserve">${xml(text)}</t></r>`;
      let position = 0, runs = '';
      ranges.forEach(start => { if (start > position) runs += run(value.slice(position,start),'FF000000'); runs += run(value.slice(start,start+2),'FFFF0000'); position = start + 2; });
      if (position < value.length) runs += run(value.slice(position),'FF000000');
      return `<c${attrs.replace(/\st="[^"]*"/g,'')} t="inlineStr"><is>${runs}</is></c>`;
    });
    const validation = (range,formula,prompt) => `<dataValidation type="list" errorStyle="stop" allowBlank="1" showDropDown="0" showInputMessage="1" showErrorMessage="1" promptTitle="下拉选择" prompt="${xml(prompt)}" errorTitle="选项无效" error="请从下拉列表选择有效值。" sqref="${range}"><formula1>${xml(formula)}</formula1></dataValidation>`;
    const applyStyle = (source, sheetIndex) => {
      source=source.replace(/<row\b([^>]*)>([\s\S]*?)<\/row>/g,(_,attrs,cells)=>{
        const row=Number(attrs.match(/\br="([0-9]+)"/)?.[1]||0),height=row===1?48:sheetIndex===2?48:row<=4?64:20;
        attrs=attrs.replace(/\s(?:ht|customHeight)="[^"]*"/g,'');
        cells=cells.replace(/<c\b([^>]*?)(\/>|>)/g,(__,cellAttrs,end)=>{
          const column=cellAttrs.match(/\br="([A-Z]+)[0-9]+"/)?.[1]||'',header=row===1;
          let style=header?1:4;
          if(sheetIndex===1)style=header?1:column==='B'?3:column==='A'?(row===4?6:2):4;
          if(sheetIndex===2&&!header)style=3;
          return `<c${cellAttrs.replace(/\ss="[^"]*"/g,'')} s="${style}"${end}`;
        });
        if(sheetIndex===1&&row>=2&&row<=4&&!new RegExp(`r="B${row}"`).test(cells))cells=cells.replace(/(<c\b[^>]*\br="A[0-9]+"[^>]*>[\s\S]*?<\/c>)/,`$1<c r="B${row}" s="3"/>`);
        return `<row${attrs} ht="${height}" customHeight="1">${cells}</row>`;
      });
      if(sheetIndex===2){const present=new Set([...source.matchAll(/<row\b[^>]*\br="([0-9]+)"/g)].map(match=>Number(match[1])));const blanks=Array.from({length:100},(_,index)=>index+2).filter(row=>!present.has(row)).map(row=>`<row r="${row}" ht="32" customHeight="1">${Array.from({length:24},(_,index)=>`<c r="${XLSX.utils.encode_col(index)}${row}" s="3"/>`).join('')}</row>`).join('');source=source.replace('</sheetData>',`${blanks}</sheetData>`);}
      const views=`<sheetViews><sheetView workbookViewId="0" showGridLines="1">${sheetIndex===2?'<pane xSplit="4" ySplit="1" topLeftCell="E2" activePane="bottomRight" state="frozen"/><selection pane="bottomRight" activeCell="E2" sqref="E2"/>':''}</sheetView></sheetViews>`;
      source=/<sheetViews>/.test(source)?source.replace(/<sheetViews>[\s\S]*?<\/sheetViews>/,views):source.replace(/(<dimension\b[^>]*\/>)/,`$1${views}`);
      const rules=sheetIndex===1?validation('B3','SurveyImportTypes','必填，请选择当前端有效问卷类型。'):sheetIndex===2?validation('B2:B101',`"${TYPES.join(',')}"`,'必填，请选择题目类型。')+validation('D2:D101','"是,否"','必填：“是”为必答题，“否”为非必答题。'):'';
      return rules?source.replace('</sheetData>',`</sheetData><dataValidations count="${sheetIndex===1?1:2}">${rules}</dataValidations>`):source;
    };
    [1,2].forEach(index=>{const path=`xl/worksheets/sheet${index}.xml`;write(path,emphasizeRequired(applyStyle(read(path),index),book.Sheets[SHEETS[index-1]]));});
    const alignment='<alignment vertical="center" wrapText="1"/>';
    const fonts=[false,true].map(bold=>`<font>${bold?'<b/>':''}<sz val="11"/><color rgb="FF000000"/><name val="Microsoft YaHei"/><family val="2"/></font>`).join('');
    // Excel reserves fill 0/1 for none/gray125. Every authored cell uses fill 0.
    const fills='<fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>';
    const styles=[0,1,0,0,0,0,0].map(font=>`<xf numFmtId="0" fontId="${font}" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1">${alignment}</xf>`).join('');
    write('xl/styles.xml',`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2">${fonts}</fonts><fills count="2">${fills}</fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="7">${styles}</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`);
    return new Uint8Array(XLSX.CFB.write(zip,{type:'array',fileType:'zip',compression:true}));
  }
  function saveTemplateBytes(bytes) {
    const blob=new Blob([bytes],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),url=URL.createObjectURL(blob),link=document.createElement('a');
    link.href=url;link.download='问卷导入模版.xlsx';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);return true;
  }
  function downloadTemplate() {
    if (state.preview !== 'pc') return false;
    try { saveTemplateBytes(buildTemplateBytes()); track('excel_template_download', {result: 'success', template_version:'V1.16'}); return true; }
    catch (error) { track('excel_template_download', {result: 'failed'}); toast(error.message || '模板下载失败，请重试'); return false; }
  }
  async function readFile(file, options = {}) {
    if (!file || !/\.(xlsx|xls)$/i.test(file.name || '')) return {ok: false, errors: [errorRow('文件', '', '', '仅支持 .xlsx、.xls 文件')]};
    if (!file.size || file.size > MAX_BYTES) return {ok: false, errors: [errorRow('文件', '', '', file.size ? '文件不能超过 5 MB' : '文件内容为空')]};
    if (typeof XLSX === 'undefined') return {ok: false, errors: [errorRow('文件', '', '', 'Excel 组件加载失败，请刷新后重试')]};
    try {
      const buffer = await file.arrayBuffer(), bytes = new Uint8Array(buffer);
      if (!bytes.length || bytes.length > MAX_BYTES) throw new Error('文件大小无效');
      const compound = bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0;
      let directory = '';
      if (compound) for (let index = 0; index < bytes.length; index += 2) directory += String.fromCharCode(bytes[index] | ((bytes[index + 1] || 0) << 8));
      if (compound && (/\.xlsx$/i.test(file.name) || /EncryptedPackage|EncryptionInfo/.test(directory))) return {ok: false, errors: [errorRow('文件', '', '', '不支持密码保护或加密文件，请解除保护后上传')]};
      const zip = bytes[0] === 0x50 && bytes[1] === 0x4b;
      const biff = bytes[0] === 0x09 && [0x00, 0x02, 0x04, 0x08].includes(bytes[1]);
      if ((!zip && !compound && !biff) || (/\.xlsx$/i.test(file.name) && !zip)) throw new Error('文件不是有效的 Excel 工作簿');
      const book = XLSX.read(buffer, {type: 'array', bookVBA: true, bookFiles: true, cellFormula: true});
      return parseWorkbook(book, options);
    } catch (error) {
      return {ok: false, errors: [errorRow('文件', '', '', /password|encrypt|FilePass/i.test(error.message || '') ? '不支持密码保护或加密文件，请解除保护后上传' : '文件读取失败，请检查文件是否损坏并使用下载模板')]};
    }
  }
  function commitDraft(result) {
    if (state.preview !== 'pc') throw new Error('请在 PC 端导入问卷');
    const value = result?.ok ? result.value : result;
    if (!value || !value.title || value.title.length > 50 || value.description?.length > 500 || !Array.isArray(value.questions) || !value.questions.length || value.questions.length > 100) throw new Error('导入内容校验未通过');
    const matches = CONFIG[state.portal].surveyTypes.filter(type => String(type.id) === String(value.surveyTypeId) && type.name === value.surveyTypeName);
    if (matches.length !== 1) throw new Error('问卷类型已失效，请重新上传文件');
    value.questions.forEach(question => { const problem = questionValidationError(question.title, question.type, question.options); if (!TYPES.includes(question.type) || problem) throw new Error(problem || '题型无效'); });
    const portal = state.portal;
    const saved = transaction(() => {
      resetCreationState();
      state.draftTitle = value.title; state.draftDescription = value.description || '';
      state.draftSurveyTypeId = String(matches[0].id); state.draftSurveyTypeName = matches[0].name;
      state.questions = typeof SurveyRouting !== 'undefined' ? SurveyRouting.cloneQuestions(value.questions, true) : cloneQuestions(value.questions);
      let id = Date.now(); while (Object.values(CONFIG).some(config => config.surveys.some(survey => survey.id === id))) id++;
      const payload = draftPayload(), survey = {id, ...payload, creationSource: 'excel', excelImportVersion: VERSION,
        owner: CONFIG[portal].user.split(' · ')[0], createdAt: formatSystemTime(), deleted: 0, status: 'draft', statusText: '草稿'};
      CONFIG[portal].surveys.unshift(survey);
      state.editingSurveyId = id; state.preserveSurveyTypeSnapshot = true; state.step = 1;
      state.page = 'list/create'; state.listView = 'published';
      return survey;
    }, true);
    creationSessionId = saved.id;
    return saved;
  }

  function renderDialog() {
    if (!dialog) return;
    const current = dialog, summary = current.parsed?.ok ? `<div class="survey-excel-success" role="status">校验通过：${escape(current.parsed.value.title)}，共 ${current.parsed.value.questions.length} 道题。确认导入后自动保存为草稿。</div>` : '';
    const errors = current.errors.length ? `<div class="survey-excel-errors" role="alert"><b>共 ${current.errors.length} 项错误，请修改 Excel 后重新上传</b><div class="survey-excel-error-table"><table><thead><tr><th>工作表</th><th>行号</th><th>字段</th><th>错误说明</th></tr></thead><tbody>${current.errors.map(error => `<tr><td>${escape(error.sheet)}</td><td>${escape(error.row || '—')}</td><td>${escape(error.column || '—')}</td><td>${escape(error.message)}</td></tr>`).join('')}</tbody></table></div></div>` : '';
    current.layer.innerHTML = `<section class="survey-excel-dialog" role="dialog" aria-modal="true" aria-labelledby="survey-excel-title" data-prd-overlay="excel-import"><header><h2 id="survey-excel-title">Excel 导入</h2><button type="button" class="survey-excel-close" data-excel-close aria-label="关闭 Excel 导入">×</button></header><div class="survey-excel-body"><p>模板已预填基本信息及七种题型示例，可修改或删除后导入。问卷类型、题目类型、是否必填均可下拉选择；单选、多选按选项1～20每格填写一项。</p><button type="button" class="btn" data-excel-download>下载模版</button><label class="survey-excel-upload ${current.busy ? 'is-busy' : ''}"><input type="file" accept=".xlsx,.xls" data-excel-file ${current.busy ? 'disabled' : ''}><strong>${current.busy ? '正在读取并校验…' : current.file ? escape(current.file.name) : '点击选择 Excel 文件'}</strong><span>支持 .xlsx、.xls，文件不超过 5 MB</span></label><p class="survey-excel-note">导入成功后进入第 1 步；接收人员和收集设置需手动配置。日期时分、仅图片和选项跳转可在问卷设计中继续设置。</p>${summary}${errors}</div><footer><button type="button" class="btn" data-excel-close>取消</button><button type="button" class="btn primary" data-excel-confirm ${current.busy || !current.parsed?.ok ? 'disabled' : ''}>${current.busy ? '校验中…' : '确认导入'}</button></footer></section>`;
    current.layer.querySelectorAll('[data-excel-close]').forEach(button => button.onclick = () => close('button'));
    current.layer.querySelector('[data-excel-download]').onclick = downloadTemplate;
    current.layer.querySelector('[data-excel-file]').onchange = event => selectFile(event.target.files?.[0]);
    current.layer.querySelector('[data-excel-confirm]').onclick = confirmImport;
    if (typeof decorateOverlay === 'function') decorateOverlay(current.layer.querySelector('.survey-excel-dialog'), 'excel-import');
  }
  function open(trigger = null) {
    if (state.preview !== 'pc' || dialog) return false;
    state.createSurveyMenuOpen = false; renderShell();
    const layer = document.createElement('div'); layer.className = 'survey-excel-mask';
    dialog = {layer, trigger, file: null, parsed: null, errors: [], busy: false, token: ++generation, context: `${state.portal}:${CONFIG[state.portal].org}:${CONFIG[state.portal].user}`};
    layer.onclick = event => { if (event.target === layer) close('mask'); };
    document.body.appendChild(layer); renderDialog();
    layer.querySelector('[data-excel-download]')?.focus(); track('excel_import_open'); return true;
  }
  function close(method = 'button') {
    if (!dialog) return;
    const current = dialog; dialog = null; generation++;
    current.layer.remove();
    if (method !== 'success') track('excel_import_cancel', {close_method: method});
    if (current.trigger?.isConnected) current.trigger.focus();
    else document.querySelector('[data-create-survey-menu-toggle]')?.focus();
  }
  async function selectFile(file) {
    if (!dialog || !file) return false;
    const current = dialog, token = ++generation;
    current.token = token; current.file = file; current.busy = true; current.parsed = null; current.errors = []; renderDialog();
    track('excel_import_file_select', {file_size: file.size, file_type: String(file.name || '').split('.').pop().toLowerCase()});
    const startedAt = Date.now(), parsed = await readFile(file, {portal: state.portal});
    if (dialog !== current || current.token !== token || generation !== token) return false;
    current.busy = false; current.parsed = parsed; current.errors = parsed.errors; renderDialog();
    track('excel_import_validate', {result: parsed.ok ? 'success' : 'failed', error_count: parsed.errors.length});
    if (!parsed.ok) track('excel_import_result', {result: 'failed', error_code: 'validation', error_count: parsed.errors.length, question_count: 0, duration_ms: Date.now() - startedAt});
    return parsed;
  }
  function confirmImport() {
    if (!dialog || dialog.busy || !dialog.parsed?.ok) return false;
    const current = dialog;
    if (current.context !== `${state.portal}:${CONFIG[state.portal]?.org}:${CONFIG[state.portal]?.user}` || state.preview !== 'pc') { close('context_change'); return false; }
    current.busy = true; renderDialog();
    const startedAt = Date.now();
    try {
      const survey = commitDraft(current.parsed);
      close('success'); location.hash = 'list/create'; renderShell();
      toast('导入成功，草稿已保存'); track('excel_import_result', {result: 'success', error_code: '', error_count: 0, duration_ms: Date.now() - startedAt, survey_id: survey.id, question_count: survey.questions.length}); return survey;
    } catch (error) {
      current.busy = false; current.errors = [errorRow('保存', '', '', error.message || '草稿保存失败，请重试')]; renderDialog();
      track('excel_import_result', {result: 'failed', reason: 'save', error_code: 'save', error_count: 1, question_count: current.parsed?.value?.questions?.length || 0, duration_ms: Date.now() - startedAt}); return false;
    }
  }
  function install() {
    if (installed || typeof state === 'undefined') return;
    installed = true; restorePersisted();
    const baseCreate = createPage;
    createPage = function (...args) {
      const html = baseCreate(...args);
      return state.preview === 'pc' && creationSessionId === state.editingSurveyId && state.page === 'list/create'
        ? html.replace(/(<h[12][^>]*>)编辑问卷(<\/h[12]>)/, '$1新增问卷$2') : html;
    };
    const baseMenu = createSurveyMenu;
    createSurveyMenu = function () {
      const html = baseMenu();
      return state.preview === 'pc' ? html.replace(/(<button\b[^>]*data-create-survey-template\b[^>]*>[\s\S]*?<\/button>)/,
        '$1<button type="button" role="menuitem" data-create-survey-excel><b>Excel 导入</b></button>') : html;
    };
    const baseSave = saveDraftSurvey;
    saveDraftSurvey = function () {
      const existing = CONFIG[state.portal]?.surveys.find(survey => survey.id === state.editingSurveyId);
      return imported(existing) ? transaction(() => baseSave()) : baseSave();
    };
    installLoadAdapter();
    const baseModal = modal;
    modal = function (title, text, ok, callback, ...rest) {
      return baseModal(title, text, ok, typeof callback === 'function' ? () => Object.values(CONFIG).some(config => config.surveys.some(imported)) ? transaction(callback) : callback() : callback, ...rest);
    };
    const baseRender = renderShell;
    renderShell = function () {
      if (dialog && (state.preview !== 'pc' || dialog.context !== `${state.portal}:${CONFIG[state.portal]?.org}:${CONFIG[state.portal]?.user}`)) close('context_change');
      const result = baseRender();
      if (!transactionDepth) { try { persistAll(); } catch (error) { track('excel_draft_save_failed', {reason: 'storage'}); toast(error.message); } }
      return result;
    };
    document.addEventListener('click', event => {
      const button = event.target?.closest?.('[data-create-survey-excel]');
      if (!button) return; event.preventDefault(); event.stopImmediatePropagation(); open(button);
    }, true);
    document.addEventListener('keydown', event => {
      if (!dialog) return;
      if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); close('escape'); return; }
      if (event.key !== 'Tab') return;
      const controls = [...dialog.layer.querySelectorAll('button:not([disabled]),input:not([disabled])')], first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }, true);
    window.addEventListener('hashchange', () => { if (dialog) close('route_change'); if (location.hash !== '#list/create') creationSessionId = null; });
    if (document.documentElement?.dataset) document.documentElement.dataset.surveyExcelImport = 'v111';
  }
  window.SurveyExcelV111 = {version: VERSION, MAX_BYTES, SHEETS, HEADERS, TEMPLATE_HEADERS, TYPES, parseWorkbook, parse: parseWorkbook,
    readFile, read: readFile, buildTemplateWorkbook, buildTemplateBytes, saveTemplateBytes, downloadTemplate, commitDraft, storageKey, persistAll, restorePersisted,
    open, close, selectFile, confirmImport, install, getDialog: () => dialog};
  // Register after compatibility scripts; install after their DOMContentLoaded restores.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
  window.addEventListener('load', () => { install(); installLoadAdapter(); });
})();
