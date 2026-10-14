/* PC survey detail export additions to the existing nine-section page PRDs.
 * Loaded after app.js, survey-jump.js and survey-detail-export.js.
 * Use page-specific profiles: the directory profile is also used by detail pages.
 */
(() => {
  'use strict';

  const pageDefinitions = {
    list: {
      profileKey: 'detailExportManagement',
      entry: '“我的问卷—我发布的”',
      goal: 'PC 端当前发布人可将所在行问卷的全部有效答卷导出为本地 Excel 文件，逐份核对提交内容。',
    },
    'all-surveys': {
      profileKey: 'detailExportDirectory',
      entry: '“问卷管理”列表',
      goal: 'PC 端具有当前组织问卷查看权限的用户可将所在行问卷的全部有效答卷导出为本地 Excel 文件，逐份核对提交内容。',
    },
  };

  const exportFeatures = [
    ['导出明细', 'PC 操作入口', '教育局端、学校端 PC 的“我的问卷—我发布的”和“问卷管理”列表均新增“导出明细”；绑定所在行问卷 ID，未开始、进行中、已暂停、已结束均提供按钮，草稿不显示。', 'P0', '【假设】置于“问卷统计”之后；我收到的及移动端不新增按钮'],
    ['Excel 结构', '名称与题目表头', '第一行仅写入问卷名称并合并本表全部列；第二行第一列为“序号”，其余列按发布顺序展示全部题目；第三行起每份有效提交占一行。', 'P0', '【假设】题目表头为“第N题：题目标题”；不增加填写人元信息列'],
    ['答卷范围', '全周期有效提交', '导出当前问卷全部有效内部及外部答卷，包含每日问卷所有日期的提交，不受列表分页、筛选或统计日期影响；不按人员去重。', 'P0', '同一人员不同日期提交分别保留；不按统计人数补造答卷'],
    ['题目关联', '快照与答案映射', '优先读取 publishedQuestions，其次读取实际保存的 questions；新格式按题目 ID 映射答案，旧格式仅在题目标题及顺序可验证时按位置映射。', 'P0', '不得生成示例题目；题答不一致终止整个导出'],
    ['图片答案', '已保存图片地址', '文件/图片题保留题目表头，仅导出已保存的 HTTP(S) 图片访问地址；支持附件对象 {name,mimeType,url} 及图片 URL 数组，相对地址按当前页面目录解析为绝对地址；同题混合附件仅保留图片地址。', 'P0', '单图设置可点击 Excel 超链接；多图按保存顺序换行列示全部地址，不嵌入图片内容'],
    ['文件与签名', '保留列头并留空', '普通文件及签名答案留空，不输出文件名、下载地址、签名标记或资源令牌；图片题未作答、逻辑跳过或未保存持久访问地址时留空。', 'P0', '历史 File.name 不得拼造图片地址；不输出 blob:、data:、file: 或其他非 HTTP(S) 地址'],
    ['文本题', '答案值与标记', '填空、单选按文本输出，多选以“、”连接，日期、位置按保存的可读文本输出；非文件/图片、非签名题沿用“未作答”“逻辑跳过”标记。', 'P0', '保留换行及前导零；文本不作为 Excel 公式执行'],
    ['空答卷', '保留两行结构', '无有效答卷时正常导出名称行及完整题目表头，不添加空答卷行。', 'P0', '仅有普通文件、签名或无有效图片地址的答卷，数据行只有序号有值'],
    ['下载交互', '处理与本地下载', '导出处理中禁用对应按钮，成功或失败后恢复；全部记录校验通过后生成 .xlsx 并发起浏览器下载，提示“已发起下载”。', 'P0', '保留原列表筛选及分页状态'],
    ['访问控制', '点击时重新校验', '根据问卷 ID 复核组织范围、入口权限、删除状态及发布状态；“我发布的”限定当前发布人，“问卷管理”限定当前组织问卷查看权限。', 'P0', '已删除、越权或草稿均拒绝导出；问卷管理保持只读'],
    ['演示数据', '内置问卷样例', '仅为内置已发布、非未开始且已有提交统计的问卷补充演示答卷，每份标记 dataOrigin=demo_sample；已有硬编码演示答卷使用同一标记；未开始、零提交及用户新建问卷不补充样例。', 'P0', '每份内置问卷最多补至 5 份演示答卷，不按统计人数生成等量记录'],
    ['演示数据', '隔离与来源标识', '新增演示答卷保存在独立导出容器，不改变统计人数、填写资格或提交频次；含样例的文件追加“数据说明”工作表，列为“主表序号”“数据来源”“说明”，逐份标明演示记录。', 'P0', '实际填写提交不添加演示标记；纯实际提交文件不增加数据说明工作表'],
    ['演示数据', '可访问样例图片', '内置样例的图片答案引用随原型部署的 assets/survey-export-demo-campus.svg；本地及线上均按所在页面目录解析为图片地址，普通文件样例保持空值导出。', 'P0', '静态图片及其答卷均为演示数据，不属于业务真实用户提交'],
  ];

  const exportFields = [
    ['导出明细入口', '仅教育局端、学校端 PC 的我发布的及问卷管理列表，草稿不展示；点击按所在行 ID 校验，不读取列表序号作为问卷 ID。', 'surveyId / sourcePage / portal / preview'],
    ['Excel 名称行', '第一行仅包含问卷名称，并合并至最后一道题所在列，不输出其他基本信息。', 'survey.title'],
    ['Excel 题目行', '第二行以“序号”为首列，其后按发布顺序保留全部题目，包含文件/图片题及签名题；【假设】表头为“第N题：题目标题”。', 'publishedQuestions / questions'],
    ['Excel 答卷行', '第三行起每份有效提交占一行，序号从 1 连续递增；内部、外部和每日全周期提交均纳入，不增加姓名、身份、手机号、组织、答卷编号或提交时间列。', '有效答卷记录 / answerEntries / answers'],
    ['图片答案', '仅导出已保存的 HTTP(S) 图片访问地址；支持附件对象 {name,mimeType,url} 及图片 URL 数组，相对路径按当前页面目录解析；混合附件仅保留图片地址。单图设置可点击超链接，多图换行列示全部地址。', 'question.type / imageOnly / 附件 mimeType / 附件 url / location.href'],
    ['文件与签名答案', '普通文件和签名留空；图片未答、逻辑跳过或无持久地址时留空。原始 File.name、资源令牌及非 HTTP(S) 地址不得转换或输出为图片链接。', 'answerEntries.status / 保存的答案值 / 附件元数据'],
    ['导出文件命名', '【假设】文件名为“问卷名称_明细_北京时间YYYYMMDD_HHmmss.xlsx”，非法文件名字符替换为下划线；主工作表固定为“问卷明细”。', 'survey.title / Asia/Shanghai'],
    ['历史兼容与校验', '主答卷容器优先，同一答卷 ID 不重复导出，不按人员去重；新格式按题目 ID，旧格式须核对标题及顺序；题答不一致整次拒绝。', '主答卷容器 / 历史答卷容器 / questionSnapshot'],
    ['演示答卷来源', '内置有提交统计的已发布问卷提供至多 5 份标记样例；新增样例仅供导出，不进入提交及统计容器；实际填写记录不添加演示标记。', 'detailExportDemoRecords / dataOrigin=demo_sample'],
    ['Excel 数据说明', '仅存在演示答卷时追加“数据说明”工作表，固定三列为“主表序号”“数据来源”“说明”；主表序号对应排序后的答卷序号，说明明确样例不属于业务真实用户提交。', '导出排序后的答卷记录 / dataOrigin'],
    ['演示图片地址', '样例图片使用随原型部署的 assets/survey-export-demo-campus.svg；相对路径解析保留线上项目目录，本地和线上地址均指向该静态资源，不引用或冒充真实提交图片。', 'assets/survey-export-demo-campus.svg / location.href / dataOrigin=demo_sample'],
  ];

  const exportScope = '教育局端、学校端 PC 的“我的问卷—我发布的”及“问卷管理”四处入口、单问卷 Excel 本地下载、全周期有效内部及外部答卷、题答映射校验、已保存图片访问地址导出、普通文件与签名留空、空数据与异常反馈、内置问卷演示样例及页面与文件来源标识。';
  const exportOutScope = '草稿导出、移动端新增导出入口、批量导出、图片二进制嵌入、普通文件内容及地址导出、签名内容导出、附件下载、填写人元信息导出、现有统计人员下载功能调整、后端上传与查询接口开发。';
  const exportFlow = '用户点击所在行“导出明细”；系统按 surveyId、sourcePage 复核组织、入口、未删除及已发布条件。读取发布题目和全周期有效答卷，校验每份答卷与题目对应关系；构造名称行、题目行及连续编号的答卷行。文件/图片题仅提取已保存的 HTTP(S) 图片访问地址，同题混合附件排除普通文件；相对图片地址按当前页面目录解析，单图设置可点击超链接，多图按保存顺序换行列示全部地址。普通文件、签名、图片未答、逻辑跳过及无持久地址均留空。全部记录校验通过后一次生成工作簿并发起下载。处理期间禁用对应按钮，结束后恢复；成功提示“已发起下载”，失败保留原列表筛选及分页。【假设】文件名为“问卷名称_明细_北京时间YYYYMMDD_HHmmss.xlsx”，非法文件名字符替换为下划线，主工作表名称固定为“问卷明细”。文件含标记样例时追加“数据说明”工作表，按主表序号标明演示来源，主表原有行列结构保持不变。';
  const exportExceptions = '无有效答卷时仅导出前两行；全部题目仅含普通文件、签名或无有效图片地址时保留全部列头，已提交答卷行仅序号有值。非媒体题未作答、逻辑跳过分别保留对应标记；文件/图片题未答、逻辑跳过或未保存持久图片地址时留空，签名始终为空。仅保存原始 File.name 的历史上传答案不得按文件名拼造地址；资源令牌、无效地址及 blob:、data:、file: 等非 HTTP(S) 地址均不导出。普通文件即使保存下载地址仍留空；同题混合图片及文件只列示图片地址，多图不丢失后续地址。问卷已删除、越权或变为草稿时提示“问卷不存在或无权导出”；题目或答案结构不一致时终止整个导出，提示“问卷题目与答卷数据不一致，请联系管理员”，不得生成部分文件。生成失败提示“导出失败，请重试”。超过 Excel 工作表容量时终止并提示容量限制，不截断答卷。未开始、零提交及用户新建问卷不得补造样例；重复初始化不重复添加样例，纯实际提交文件不增加“数据说明”工作表。';
  const exportData = '导出沿用现有答卷有效性标识，排除失效记录；不因外部、匿名身份或人员退出接收范围而排除历史有效提交。每份提交独占一行，同一人员不同日期分别保留，序号从 1 连续递增。兼容历史容器，同一答卷 ID 冲突时主答卷容器优先，不按人员去重。题目优先 publishedQuestions，其次实际 questions，不生成示例题目；新格式按题目 ID 映射，旧格式须核对题目标题及顺序，重名题不得错列。填空、单选按文本，多选以“、”连接，日期、位置使用保存的可读文本，保留换行及前导零且不执行公式。图片答案支持已保存的图片 URL、图片 URL 数组及附件对象 {name,mimeType,url}；依据已保存的图片类型及地址提取 HTTP(S) 图片访问地址，相对路径按 location.href 所在页面目录解析。普通文件 MIME 不得因名称带图片扩展名而导出；同题混合附件仅保留图片地址，单图设置可点击超链接，多图按保存顺序换行列示全部地址。图片未答、逻辑跳过、仅有文件名或无持久访问地址时为空；普通文件及签名全部为空，不转换资源令牌及非 HTTP(S) 地址。不使用统计人数补造答卷、答案或提交信息。【假设】按提交时间倒序，时间相同按答卷 ID 排序，缺失时间置末尾。记录 survey_detail_export_click、survey_detail_export_result；【假设】属性包含端别、组织、问卷 ID、来源页面、导出份数、结果、失败原因及耗时，不记录答案内容。演示数据仅限内置有提交统计的已发布、非未开始问卷，包含已有 5 条硬编码演示记录和启动时补充的样例，每份均标记 dataOrigin=demo_sample；统计人数只作为内置样例初始化条件，不作为样例数量或真实答卷依据。新增样例保存在 detailExportDemoRecords，与 MY_RESPONSES、内部人员及历史统计容器隔离。样例图片使用随原型发布的 assets/survey-export-demo-campus.svg，本地及线上均按当前页面目录解析，不引用真实用户图片。实际填写提交不添加演示标记，也不改写其答案；混合导出按完整记录排序后的序号标明演示行。“数据说明”工作表固定列为“主表序号”“数据来源”“说明”，仅列出演示记录，说明为“本地原型演示样例，不属于业务真实用户提交”；无标记样例时不生成该工作表。';
  const exportRisks = '复用现有 Excel 库，导出数据独立于包含日期筛选、人员去重或示例补值的统计数据源。历史题目快照缺失且无法核对对应关系时按结构异常拒绝。当前原型的真实上传填写链路只保存 File.name，没有持久图片访问地址；此类历史答案导出为空，不以静态样例替换或拼造真实图片地址。正式后端接入需提供全周期有效答卷查询、图片附件 MIME 及持久访问地址，并由服务端复核组织与结果访问权限；图片地址须在导出后满足业务访问权限及有效期要求。静态演示图片随原型一并部署，本地及线上地址解析须保留页面目录与线上项目路径。Excel 一个单元格仅设置一个超链接，单图可点击，多图以换行文本保留全部地址。仅补齐教育局演示问卷 1、4及学校演示问卷 12、14与已有演示答卷相符的三题结构，不改写用户实际提交内容。现有统计人员下载仍限定内部人员并保持原行为；内部人员详情限制只适用于带身份的单份详情，匿名答案导出按本新增规则纳入外部答卷。演示样例不属于业务真实用户提交，新增样例不得进入统计和参与资格计算，不改变原有填写频次、填写状态及接收权限；真实数据接入继续由正式后端提供。';
  const exportAcceptance = '两端四处 PC 入口均可操作，草稿无按钮，其他已发布状态均可导出；我收到的及移动端无新增按钮。文件第一行仅问卷名称并合并全部列，第二行仅序号与全部题目，第三行起逐份展示全周期有效内部及外部答卷且序号连续，不受分页及统计日期影响。同人跨日期、多选、重名题、跳题、换行及前导零无丢失或错列。文件/图片及签名列头保留；已保存的单图片 HTTP(S) 地址可点击，多图片地址按保存顺序换行且完整保留；附件对象 {name,mimeType,url} 及图片 URL 数组均按规则导出。同题混合附件只输出图片地址，普通文件与签名单元格为空；图片未答、逻辑跳过、原始文件名及无持久图片地址均为空，不输出资源令牌及非 HTTP(S) 地址。相对图片地址在本地及线上均按页面目录正确解析，样例图片 assets/survey-export-demo-campus.svg 在两处均可访问，并有演示数据来源说明。无答卷仅前两行；权限、删除、草稿、结构错误及容量异常按规则整次拒绝。生成失败后按钮恢复且原筛选不变，文件可正常打开。问卷管理只读行为、内部人员详情限制和现有统计人员下载均保持原规则。内置有提交问卷的样例均具有演示标记，未开始、零提交及用户新建问卷不补样例；重复初始化不重复添加。含样例文件的“数据说明”表具有固定三列，所有样例序号与主表逐份对应；纯实际提交文件不生成该表。样例初始化前后统计人数、本人和外部填写资格、提交频次均保持不变；实际填写提交保持原答案且不添加演示标记。';

  const append = (value, addition) => value ? `${value} ${addition}` : addition;
  const cloneProfile = profile => ({
    ...profile,
    features: (profile.features || []).map(row => [...row]),
  });

  Object.entries(pageDefinitions).forEach(([pageKey, definition]) => {
    const rule = PRD_PAGE_RULES[pageKey];
    const existingProfileKey = PRD_V16_PROFILE_KEYS.page[pageKey];
    const existingProfile = PRD_V16_PROFILES[existingProfileKey];
    if (!rule || !existingProfile || existingProfileKey === definition.profileKey) return;

    const profile = cloneProfile(existingProfile);
    // Keep the existing single-response identity restriction; it does not prohibit
    // anonymous answer export from the authorized PC list.
    profile.outScope = (profile.outScope || '').replace(/外部人员答卷明细/g, '外部人员身份明细与单份答卷详情');
    profile.features.forEach(row => {
      if (row[0] === '答卷明细' && row[1] === '内部人员限定') {
        row[4] = '仅带身份的单份详情；PC 答案导出另按全量内部及外部有效答卷口径';
      }
    });
    profile.users = append(profile.users, `PC ${definition.entry}授权用户通过“导出明细”逐份核对全部有效提交，导出不提供填写人身份信息。`);
    profile.inScope = append(profile.inScope, exportScope);
    profile.outScope = append(profile.outScope, exportOutScope);
    profile.features.push(...exportFeatures.map(row => [...row]));
    profile.flow = append(profile.flow, exportFlow);
    profile.exceptions = append(profile.exceptions, exportExceptions);
    profile.data = append(profile.data, exportData);
    profile.risks = append(profile.risks, exportRisks);
    profile.acceptance = append(profile.acceptance, exportAcceptance);

    PRD_V16_PROFILES[definition.profileKey] = profile;
    PRD_V16_PROFILE_KEYS.page[pageKey] = definition.profileKey;
    rule.goal = append(rule.goal, definition.goal);
    rule.fields = [...(rule.fields || [])];
    exportFields.forEach(row => {
      const index = rule.fields.findIndex(existing => existing[0] === row[0]);
      if (index < 0) rule.fields.push([...row]);
      else rule.fields[index] = [...row];
    });
  });
})();
