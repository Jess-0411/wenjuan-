/* PC V1.11 page rules. Canonical detailed text is in survey-pc-v111-prd-data.json. */
(function () {
  'use strict';
  const chapters = ['1. 背景与目标','2. 用户与使用场景','3. 需求范围','4. 功能需求列表','5. 核心流程与交互说明','6. 异常场景与边界条件','7. 数据口径与埋点需求','8. 风险、依赖与限制','9. 验收标准'];
  const features = {
    excel: [
      ['Excel导入','入口与模板','PC新增问卷菜单增加Excel导入；弹窗分上传和校验结果两页；上传仅回显文件，开始导入后进入不可返回的校验页，通过后确认导入才创建草稿。文件名为问卷导入模版.xlsx，新版仅包含基本信息、问卷内容两张工作表。','P0','移动端不新增入口'],
      ['Excel导入','必填标识','名称、类型及题目基础列保留必填标识，选项1、2标明选择题必填；只将括号内必填二字设为红色FFFF0000，其余文字黑色。移除完整（非必填）标识但保留问卷说明和选项3～20字段。全部无底色、表头加粗，题目表冻结首行及前四列。','P0','是否必填选择否仍为有效填写'],
      ['Excel导入','原生下拉','基本信息B3下拉包含当前端有效问卷类型并默认选中首项，问卷内容B2:B101下拉包含七种题型、D2:D101下拉包含是/否；三处绑定实际选项，停止型验证阻止无效输入。','P0','粘贴绕过下拉仍须完整解析校验'],
      ['Excel导入','默认示例','基本信息B2:B4、问卷内容A2:X8保留可修改、删除或直接导入的默认数据，覆盖七种题型；新版删除基本信息示例列及填写说明工作表。','P0','实际内容区保留的默认题目参与生成'],
      ['Excel导入','模板兼容','新版两表、三列基本信息与简化选项表头独立映射；兼容旧三表、两列或四列基本信息、旧五列换行选项及带非必填标识的24列，拒绝未知表头、字段和同表混合结构。','P0','不使用模糊表头归一化'],
      ['Excel导入','字段与七题型','基本信息导入名称、有效问卷类型、说明；题目导入题号、七种现有题型、标题、必填及按列填写的选项。单选、多选从选项1连续填写2～20项，一格一项且每项≤50字；不得单格换行或中间留空。非选择题选项列留空；高级配置在页面补充。','P0','沿用现有长度与题量限制'],
      ['Excel导入','事务保存','校验通过不创建草稿；点击确认导入且保存成功后仅生成一份草稿，进入新增第1步；接收人员为空、收集设置手动配置，后续保存及发布复用同ID。','P0','取消或失败不生成部分问卷'],
      ['Excel导入','文件与错误','支持xlsx、xls且不超过5MB，拒绝加密及宏文件；错误包含工作表、行、字段、原因，导入中防重复提交。','P0','【假设】5MB上限'],
      ['Excel导入','原型恢复','仅持久化Excel创建问卷，按端、组织、用户隔离；刷新恢复同ID，保存、发布、删除同步更新。','P1','【假设】原型本地存储，不保存原文件']
    ],
    role: [
      ['角色投放','独立角色字段','PC接收人员增加独立角色字段，支持搜索、多选、成员查看及一键整角色选择；临时副本确定提交，取消回滚。','P0','移动端保留和解析既有范围'],
      ['角色投放','数据及组织边界','包含系统角色、正式任职身份；学校仅本校，教育局仅局机关；按稳定角色ID关联实名有效成员。','P0','不使用固定人数'],
      ['角色投放','并集及动态资格','与其他来源取并集，personId去重并保留来源；角色成员实时变更资格，卸任不删除历史有效答卷。','P0','移除单一来源不影响其他来源'],
      ['角色投放','失效校验','空角色不可新增选择，发布前已选角色越权、失效或无有效成员须重选；收集期变空仅停止新增资格。','P0','成员须active且canReceive=true']
    ],
    filter: [
      ['题目数据','部门与年级筛选','教育局仅部门，学校同时展示部门和年级；默认全部。同字段多选OR，部门与年级AND；空数组不限制，清空不影响另一字段；查询/重置生效。','P0','教育局部门仍仅局机关；年级仅学生及家长'],
      ['题目数据','提交时归属','按可信提交快照筛选；家长对应本次学生关系，历史缺失归属为未归类，外部仅全部，教师不参与年级。','P0','不反推历史归属'],
      ['题目数据','独立统计上下文','仅更新题目统计、回答和附件；不改变顶部卡片、人员明细及下载、列表导出明细。','P0','与现有日期共同生效'],
      ['题目数据','筛选交互','待查询与已应用分离；编辑不刷新，查询生效才保留题号、重置分页并清附件，重置立即恢复全部；无命中展示空态，使用有效答卷及跳题聚合。','P0','不按人数补造分组答案'],
      ['附件','当前结果操作','支持逐项选择及全选当前筛选结果，含分页外记录；另存为仅保存已选附件，未选择时禁用；任务启动时固定文件集合。','P0','沿用资源中心权限']
    ]
  };
  features.excel.push(
    ['Excel导入','服务端复核与原子落库','服务端按登录组织复核模板、有效问卷类型及全部题目；问卷、题目、选项同事务提交，任一失败全部回滚，成功后才返回草稿ID。','P0','EX-01～EX-04；错误保留原始行号'],
    ['Excel导入','幂等与并发保存','同一次导入的并发或超时重试只创建一份问卷；后续编辑、保存和发布复用同ID。','P0','EX-05～EX-06；【假设】requestId、configVersion逻辑契约']
  );
  features.role.push(
    ['角色投放','发布和提交校验','服务端按组织边界及实时有效成员解析；发布前失效、越权、变空阻止整次发布，提交前卸任且无其他来源覆盖时拒绝新提交。','P0','RL-01～RL-06；不以发布人数冻结角色资格'],
    ['共享提交','任务与归属事务','所有填写渠道校验同一任务资格，答卷与可信身份/组织归属快照同事务保存；家长按本次对应学生任务归类。','P0','RL-07；【假设】taskId与任务防重键复用现有模型']
  );
  features.filter.push(
    ['题目数据','查询与聚合规则','服务端先筛有效答卷再聚合题目；按responseId去重，明确适用、跳过、未答、有效回答数及选项比例分母。','P0','QF-01～QF-06；无该题的历史答卷不计未答'],
    ['附件','服务端范围与授权','全选覆盖筛选结果所有分页，另存任务启动时固定有权文件集合并校验目标目录写权限。','P0','QF-07；【假设】文件ID/全选排除协议']
  );
  features.excel.push(['Excel导入','两阶段状态与取消','upload→validating→invalid/ready→saving；结果页无返回，校验中可取消且旧任务失效，失败仅取消/重新导入，通过仅取消/确认导入，保存中禁止重复提交与关闭。','P0','EX-02、EX-04、EX-06']);
  features.filter.push(['题目数据','树形级联与历史项','部门层级、学校→学段→年级；父级覆盖自身及所有下级适用节点，半选、搜索、已选回显、清空；历史归属单独分组，未归类独立。','P0','搜索不缩小级联集合'],['题目数据','待查询与已应用','编辑条件保留结果与附件范围，查询后应用；重置立即恢复全部。附件全选及另存均取已应用条件。','P0','QF-02、QF-06']);
  const content = {
    excel: [
      '通过Excel批量录入问卷内容并保存为可继续配置的草稿，减少逐题创建。',
      '学校端和教育局端PC问卷创建人从已整理的Excel创建问卷。',
      '', '',
      '新增问卷→Excel导入→点击下载模版→修改默认示例或直接上传（仅回显文件）→开始导入→不可返回的校验结果页→完整校验→确认导入→保存草稿→关闭弹窗→进入新增第1步。实际下载文件名为问卷导入模版.xlsx，下载结果仅含基本信息、问卷内容两张工作表。基础信息与问卷设计完整回填，接收人员为空，收集设置由创建人配置；后续保存、重新编辑及发布复用同一问卷ID。新版基本信息仅显示A:C三列，表头依次为字段、内容、填写要求，不再提供填写示例列。第2～4行字段依次为问卷名称（必填）、问卷类型（必填）、问卷说明。内容列B2:B4保留完整默认数据；填写要求保留名称最多50字、类型从下拉选择、说明最多500字且可留空。只移除问卷说明原有的（非必填）标识，字段本身及其可选属性保留。导入仅读取内容列，填写要求不写入问卷。新版问卷内容A:D依次为题号（必填）、题目类型（必填）、题目标题（必填）、是否必填（必填）；E、F依次为选项1（选择题必填）、选项2（选择题必填），G:X直接显示选项3～选项20，不显示（非必填）。单选、多选从选项1连续填写2～20项，每格一项、每项最多50字；禁止中间空项和单格换行，非选择题选项全部留空。题型下拉只选择题目类型，答卷端决定单选一项或多选多项。第2～8行默认七题依次覆盖填空、单选、多选、日期、文件/图片、签名、位置，单选3项、多选4项；第9～101行可继续填写。保留的默认题目实际参与生成，空白尾行忽略。基本信息B3下拉为当前端有效类型并默认选中首项，问卷内容B2:B101下拉为七种题型，D2:D101下拉为是、否。三个下拉均绑定非空实际选项，配置停止型错误提示；空值、粘贴及其他绕过数据验证的输入由解析器再次校验。下拉源迁至基本信息AA:AC隐藏列，命名范围引用该位置；只将明确白名单内的源单元格视为内部元数据，其他额外列仍按模板结构校验，不将源数据导入问卷。全部单元格无底色，表头加粗。模板所有括号内仅必填二字使用红色FFFF0000，括号、字段名、选择题等前缀和其他文字均保持黑色；例如是否必填（必填）中括号外的是否必填为黑色，选项1（选择题必填）中只有末尾必填为红色。使用单元格局部富文本格式，不改变实际文本值；不以整格红色代替。题目表冻结首行及前四列，横向填写更多选项时保留题目上下文。名称1～50字、说明≤500字、题量1～100、标题1～200字；高级设置在页面补充。',
      '不支持格式、超5MB、加密、宏、损坏、缺表头、类型无效或内容错误整次拒绝，定位工作表、行、字段。继续兼容此前包含填写说明的三工作表完整模板，以及两列基本信息、带填写示例的四列基本信息、旧五列单格换行选项、带（非必填）标识的24列选项结构。新版两表三列基本信息与简化表头使用独立完整白名单；旧版说明页和示例列不作为问卷数据。旧单格选项按换行拆分，新分列选项按列顺序读取，统一映射到同一题目选项数组；未知表头、未知字段和同表混用阻止整次导入。粘贴绕过下拉和必填空值由解析器二次校验，删除全部实际题目则阻止导入。失败或取消不污染正式状态，存储失败不提示成功。',
      '解析结果为basic、questions、errors；errors含sheet、row、field、reason。新旧表头通过明确白名单映射到同一字段；不解析新版填写要求、基本信息AA:AC隐藏源，也不解析兼容旧版的示例列和填写说明。服务端事务保存全部题目并返回稳定草稿ID。记录打开、开始校验、校验通过/失败、确认保存及创建结果；校验通过不计导入成功，不记录原始文件和答案。',
      '依赖Excel库及草稿服务。【假设】当前原型仅对Excel创建问卷做浏览器本地持久化，按端/组织/用户隔离，正式环境以服务端保存成功为准。',
      '两端实际下载仅含基本信息、问卷内容两表；基本信息仅显示字段、内容、填写要求三列，完整删除（非必填）标识但保留字段。仅括号内必填二字红色，字段名等其余文字黑色，全部无底色、表头加粗；三个下拉实际数据完整。默认七题未修改可直接导入，选择题分列选项、边界及错误定位正确；新版与旧三表、旧示例列、旧单格换行及旧24列均兼容，隐藏下拉源不写入问卷。保存、编辑、刷新和发布复用同一ID；接收人员为空。'
    ],
    role: [
      '通过正式角色或任职身份一键选择接收群体，保持人员资格随角色变化。',
      '学校创建人选择本校角色；教育局创建人仅选择局机关角色，不跨至下属学校。',
      '', '',
      '打开角色选择→搜索/查看成员→多选完整角色→确定；取消、关闭、遮罩、Escape回滚。回显角色标签及去重人数；成员从正式角色和任职关系读取。',
      '空角色不可新增；发布前角色失效、越权或无有效成员阻止发布；停用或不可接收人员排除。角色收集期变空不清除历史答卷。',
      '角色范围保留来源类型、roleId、orgId，并与其他来源按personId取并集；动态资格查询和提交前复核。记录survey_role_picker_open、survey_role_picker_confirm、survey_role_picker_cancel、survey_role_validation_failed，不上报人员名单。',
      '依赖统一身份和任职关系。原型目录为明确演示关系，不以静态角色人数代替成员。移动端界面无新入口，保存既有PC范围不得丢失角色数据。',
      '教育局仅机关、学校仅本校；搜索多选及取消正确；多来源去重并保留来源；新任获得资格、卸任失去新填写资格，历史有效答卷保留。'
    ],
    filter: [
      '在题目数据内按部门或年级查看有效回答，支持针对性分析。',
      '教育局统计查看人按机关部门分析；学校统计查看人按部门或学生/家长年级分析。',
      '', '',
      '学校同时展示部门、年级，教育局仅部门，删除查看维度；字段默认全部，清空恢复全部，搜索提示统一为搜索。同字段多选取并集，部门与年级取交集，两个选择同时保留。两项全部包含有效内外部答卷，任一具体条件排除外部；具体部门与具体年级通常为空，按谓词正常返回空态；双未归类按历史unknown兼容规则匹配。树形多选支持搜索、展开、半选、清空；父选覆盖自身与全部下级适用节点，年级树为学校→学段→年级，不增加班级。搜索只影响展示，历史归属独立分组，未归类独立选项。编辑保留原结果及附件；点击查询才应用，保留题号、重置分页及附件选择，重置立即恢复全部。全部含有效内外部答卷；具体维度只匹配提交快照，外部不纳入未归类。教师不进入年级或年级未归类。',
      '历史无归属标为未归类；家长对应学生不明时不扩展至全部子女。已改名/删除归属按快照保留，无结果显示空态；逻辑跳过、未答、有效回答分别统计。',
      'respondentSnapshot保存提交时任务身份、departmentIds/Names、gradeId/Name及studentId/relationId/schoolId。PC、移动和二维码提交统一写入。按答卷ID去重，保留现有日期规则；记录survey_question_filter_change及survey_question_filter_error，不记录答案。',
      '使用独立题目筛选上下文，不能修改全局统计或导出口径。生产接口由服务端校验组织与答卷权限；历史无快照不迁移反推。筛选演示使用独立标记记录，与真实答卷、顶部统计及导出隔离。',
      '两端字段差异、同字段多选并集、双字段交集、默认全部、清空独立、身份限制、历史快照、空态及跳题统计正确；附件操作只覆盖筛选结果且含分页外数据；顶部卡片、人员下载及列表导出明细不受影响。'
    ]
  };
  const scopes = {
    excel: ['Excel两工作表精简模板下载、无填充可读表头、括号内必填局部红字、选项按列填写、有数据的原生下拉、可直接导入的默认示例、新旧模板兼容、上传、完整校验、生成草稿、继续编辑与原型恢复。','接收人员/收集设置导入、跳题等高级配置导入、原始Excel保存和移动配置入口。'],
    role: ['独立角色选择、成员预览、事务取消、动态接收资格及跨来源去重。','角色维护、教育局下属学校角色投放和移动新增角色配置入口。'],
    filter: ['PC题目数据部门/年级筛选、回答列表与当前结果附件操作、全部渠道提交归属快照。','教育局年级、教师按年级、历史归属反推、顶部卡片及人员和列表导出组织过滤。']
  };
  function moduleKeys(key, type) {
    if (state.preview !== 'pc') return [];
    if (type === 'overlay') return key === 'excel-import' ? ['excel'] : ['role-picker','recipient-picker'].includes(key) ? ['role'] : ['resource-picker','save-progress'].includes(key) ? ['filter'] : [];
    if (key === 'list') return ['excel'];
    if (['create-basic','create-editor'].includes(key)) return ['excel'];
    if (['create-recipients','create-publish'].includes(key)) return ['role'];
    if (['stats-detail','stats-save-folder'].includes(key)) return ['filter'];
    return [];
  }
  function backendRules() { return window.SurveyPcBackendRulesV111 || {}; }
  function implementation(index, key) {
    const data=backendRules()[key];
    if (!data) return '';
    const title=`<h4>${esc(data.label)} · 后端实现规则</h4>`;
    if (index===4) return `<div class="prd-implementation" data-backend-module="${key}">${title}<ol class="prd-rule-list">${data.flow.map(([id,name,text])=>`<li><strong>${esc(id)} ${esc(name)}</strong><p>${esc(text)}</p></li>`).join('')}</ol></div>`;
    if (index===5) return `<div class="prd-implementation" data-backend-module="${key}">${title}${prdTable(['触发条件','服务端处理','页面结果'],data.errors,'prd-backend-table')}</div>`;
    if (index===6) return `<div class="prd-implementation" data-backend-module="${key}">${title}<p>字段名用于表达逻辑契约，标注【假设】的新增协议由研发按现有接口规范落地；权限、事务、归属及统计口径为必需规则。</p>${prdTable(['数据对象 / 操作','字段 / 来源','约束与处理'],data.contracts,'prd-backend-table')}<h4>计算口径与埋点</h4><ul class="prd-rule-list">${data.metrics.map(text=>`<li>${esc(text)}</li>`).join('')}</ul></div>`;
    if (index===7) return `<div class="prd-implementation" data-backend-module="${key}">${title}${data.risks.map(text=>`<p class="prd-rule-paragraph">${esc(text)}</p>`).join('')}</div>`;
    if (index===8) return `<div class="prd-implementation" data-backend-module="${key}">${title}${prdTable(['验收项','操作 / 测试数据','预期结果'],data.acceptance,'prd-backend-table')}</div>`;
    return '';
  }
  function addition(index, modules) {
    if (index === 2) return modules.map(k => `<h4>V1.11 In Scope</h4><p>${esc(scopes[k][0])}</p><h4>V1.11 Out of Scope</h4><p>${esc(scopes[k][1])}</p>`).join('');
    if (index === 3) return prdTable(['功能模块','功能点','需求描述','优先级（P0 / P1 / P2）','备注说明'], modules.flatMap(k => features[k]));
    return modules.map(k => `${implementation(index,k)}${index>=4?`<details class="prd-ui-reference"><summary>${esc(backendRules()[k]?.label||'V1.11')} · 模板与页面补充规则</summary><p>${esc(content[k][index])}</p></details>`:`<p><strong>V1.11：</strong>${esc(content[k][index])}</p>`}`).join('');
  }
  function implementationNotice(modules) {
    return `<aside class="prd-backend-summary" role="note"><strong>研发实现重点</strong>${modules.map(key=>`<p><b>${esc(backendRules()[key]?.label||key)}：</b>${esc(backendRules()[key]?.highlights||'')}</p>`).join('')}<small>第5章明确执行顺序，第6章明确失败处理，第7章明确数据与计算口径，第9章提供可复现验收条件。当前为前端原型；正式环境的权限、事务、资格与数据查询由服务端执行。</small><nav class="prd-backend-nav" aria-label="研发规则快速定位">${[[4,'执行规则'],[5,'异常处理'],[6,'数据与口径'],[8,'验收标准']].map(([index,label])=>`<button type="button" data-prd-jump-section="${index}">${label}</button>`).join('')}</nav></aside>`;
  }
  function clarifyExisting(html) {
    return html
      .replace(/部门和工作组保留 dynamic scope，收集期内按最新有效成员实时解析；学校、班级、家长关系沿用既有快照。/g,'部门、工作组和角色保留动态范围定义，收集期按当前有效成员解析；学校、班级、家长关系沿用既有模型，既有快照口径不适用于动态范围。')
      .replace(/后端上传与查询接口开发/g,'原型中的生产接口部署（正式环境服务端规则见第5～9章）');
  }
  function install() {
    if (renderPrdDocument.__pcV111) return;
    PRD_OVERLAY_RULES['excel-import']={title:'Excel导入问卷规则',goal:content.excel[0],fields:[]};
    PRD_OVERLAY_RULES['role-picker']={title:'角色选择规则',goal:content.role[0],fields:[]};
    const base = renderPrdDocument;
    const wrapped = function(rule,key,type) {
      const modules=moduleKeys(key,type);
      if (!modules.length) return base(rule,key,type);
      if (type==='overlay' && key==='excel-import') {
        return `<article class="prd-document" data-prd-version="V1.11" data-prd-implementation="validation-only"><header class="prd-document-head"><h2>导入校验规则</h2><button type="button" class="prd-close" aria-label="关闭 PRD 规则">×</button></header>${prdTable(['功能模块','功能点','需求描述','优先级（P0 / P1 / P2）','备注说明'],backendRules().excel.validationRules,'prd-validation-table')}</article>`;
      }
      if (type==='overlay' && key==='role-picker') {
        return `<article class="prd-document" data-prd-version="V1.11" data-prd-implementation="backend"><header class="prd-document-head"><h2>${esc(rule?.title||'PC优化规则')}</h2><button type="button" class="prd-close" aria-label="关闭 PRD 规则">×</button></header><div class="prd-version-note">PRD V1.11 · 更新日期 2026-11-07 · 后端实现规则</div>${implementationNotice(modules)}${chapters.map((title,i)=>`<section><h3>${title}</h3>${addition(i,modules)}</section>`).join('')}</article>`;
      }
      let existing=base(rule,key,type);
      if (modules.includes('filter')) {
        existing=existing
          .replace(/另存为按题目默认保存该题全部有效上传文件，包含未加载及分页外的数据，不提供逐个选择、取消选择或排除能力。/g,'另存为保存当前筛选已选附件，包含分页外已选记录；支持逐项选择、取消和全选，未选择时禁用。')
          .replace(/另存为按题目处理该题全部有效上传文件，不提供逐个选择、取消选择或排除能力。/g,'另存为处理当前筛选已选附件；支持逐项选择、取消和全选，未选择时禁用。')
          .replace(/逐个选择附件、排除附件、/g,'')
          .replace(/不提供逐个选择、取消选择或排除能力/g,'在题目数据区支持逐项选择或全选，未选择时禁止另存')
          .replace(/整题附件全量保存/g,'当前筛选已选附件保存')
          .replace(/本次整题附件保存任务/g,'本次筛选后已选附件的保存任务')
          .replace(/整题全量/g,'当前筛选已选范围')
          .replace(/文件全量/g,'已选附件范围')
          .replace(/该题全部有效上传文件|该题全部有效附件|该题全部文件|该题全部上传文件/g,'当前筛选已选有效附件')
          .replace(/整题全部文件且无选择控件/g,'当前筛选已选附件，勾选操作在题目数据区完成')
          .replace(/正式环境必须保证指标、明细、下载和题目聚合来自同一统计快照/g,'正式环境须保证各模块使用同一有效答卷口径；题目模块额外应用独立筛选，指标、人员明细与下载沿用原范围');
      }
      const host=document.createElement('div');host.innerHTML=clarifyExisting(existing).replace(/预计人数/g,'当前接收人数');
      const article=host.querySelector('.prd-document');
      article?.setAttribute('data-prd-version','V1.11');
      article?.setAttribute('data-prd-implementation','backend');
      const version=host.querySelector('.prd-version-note');if(version){version.textContent='PRD V1.11 · 更新日期 2026-11-07 · 后端实现规则';version.insertAdjacentHTML('afterend',implementationNotice(modules));}
      const sections=Array.from(host.querySelectorAll('.prd-document > section'));
      chapters.forEach((title,i)=>{
        const section=sections.find(s=>s.querySelector('h3')?.textContent.trim()===title);
        if(!section)return;
        if(i>=4){
          const reference=document.createElement('details');reference.className='prd-ui-reference';
          const summary=document.createElement('summary');summary.textContent='现有页面字段与交互规则';reference.append(summary);
          Array.from(section.children).filter(child=>child.tagName!=='H3').forEach(child=>reference.append(child));
          section.append(reference);
          section.querySelector('h3').insertAdjacentHTML('afterend',addition(i,modules));
        }else section.insertAdjacentHTML('beforeend',addition(i,modules));
      });
      return host.innerHTML;
    };
    wrapped.__pcV111=true;renderPrdDocument=wrapped;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  document.addEventListener('click',event=>{
    const button=event.target.closest?.('[data-prd-jump-section]');
    if(!button)return;
    const article=button.closest('.prd-document'),section=article?.querySelectorAll(':scope > section')[Number(button.dataset.prdJumpSection)];
    if(!section)return;
    event.preventDefault();
    article.scrollTop+=section.getBoundingClientRect().top-article.getBoundingClientRect().top-(article.querySelector('header')?.offsetHeight||0)-12;
  });
  window.addEventListener('load',install);
  window.SurveyPcPrdV111={install,chapters,features,backendRules};
})();
