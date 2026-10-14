'use strict';

/* Export-only fixtures. These are explicitly marked examples, not business
 * submissions. Keep them out of the submission/participation/statistics stores. */
const SURVEY_DETAIL_EXPORT_DEMO_IDS = {
  bureau: [1, 2, 3, 4, 8, 9, 10, 31, 32, 34],
  school: [11, 12, 13, 14, 18, 19, 21, 41, 42, 44],
};
const SURVEY_DETAIL_EXPORT_LEGACY_DEMO_IDS = new Set([
  'B1-20260813-02', 'B1-20260810-01', 'B4-20260725-01', 'S12-20260813-01', 'S14-20260728-01',
]);

function surveyDetailExportDemoDate(s, index) {
  const today = beijingDateKey(), year = String(s.createdAt || today).slice(0, 4);
  const range = String(s.time || '').match(/(\d{2})-(\d{2})\s*至\s*(\d{2})-(\d{2})/);
  const start = s.startDate || (range ? `${year}-${range[1]}-${range[2]}` : String(s.createdAt || today).slice(0, 10));
  const end = s.endDate || (range ? `${year}-${range[3]}-${range[4]}` : today);
  const upper = end < today ? end : today;
  const candidate = new Date(`${start}T12:00:00Z`);
  candidate.setUTCDate(candidate.getUTCDate() + index);
  const date = candidate.toISOString().slice(0, 10);
  return date > upper ? upper : date;
}

function surveyDetailExportDemoValue(q, s, portal, sampleIndex, date) {
  const kind = surveyDetailExportKind(q), options = q.options || [];
  if (kind === 'single') return options[sampleIndex % options.length] || '演示选项';
  if (kind === 'multiple') return options.length ? [options[sampleIndex % options.length], options[(sampleIndex + 1) % options.length]].filter((value, index, values) => values.indexOf(value) === index) : ['演示选项'];
  if (kind === 'date') return q.includeTime ? `${date} 09:${String(sampleIndex * 7).padStart(2, '0')}` : date;
  if (kind === 'file') return sampleIndex % 2 === 0 ? 'assets/survey-export-demo-campus.svg' : `演示附件${sampleIndex + 1}.pdf`;
  if (kind === 'signature') return `演示签名${sampleIndex + 1}（不导出）`;
  if (kind === 'location') return ['浙江省-杭州市-西湖区', '江苏省-南京市-鼓楼区', '广东省-广州市-天河区'][sampleIndex % 3];
  if (/姓名/.test(q.title)) return ['张晨', '李宁', '王悦', '陈静', '赵敏'][sampleIndex % 5] + '（演示）';
  if (/手机|电话/.test(q.title)) return `演示联系电话${sampleIndex + 1}`;
  const suggestions = /交通|安全/.test(s.title)
    ? ['建议完善上下学接送路线指引。', '建议加强校园出入口高峰时段疏导。', '建议定期开展交通安全教育。', '建议优化校门周边停车秩序。', '建议增加安全隐患整改反馈。']
    : /健康/.test(s.title)
      ? ['已完成晨检，学生身体情况正常。', '建议加强季节性健康教育。', '班级健康信息已核对。', '建议完善异常情况通知流程。', '已落实日常通风与卫生管理。']
      : /数字|信息化|素养|培训|教研/.test(s.title)
        ? ['希望参加数据分析与教学应用培训。', '建议增加数字资源制作实操课程。', '希望提供人工智能辅助备课案例。', '建议组织跨校教研经验交流。', '希望完善平台使用培训与支持。']
        : portal === 'school'
          ? ['建议增加家校沟通和反馈渠道。', '建议完善校园服务指引。', '希望加强学生参与与意见反馈。', '建议优化活动安排与通知时间。', '希望及时反馈意见处理结果。']
          : ['建议明确工作安排和责任分工。', '希望加强学校之间的经验交流。', '建议完善通知与反馈机制。', '希望提供业务培训及案例支持。', '建议定期跟踪问题处理结果。'];
  return suggestions[sampleIndex % suggestions.length];
}

function initializeSurveyDetailExportDemoData() {
  Object.entries(SURVEY_DETAIL_EXPORT_DEMO_IDS).forEach(([portal, ids]) => ids.forEach(id => {
    const s = CONFIG[portal]?.surveys.find(item => item.id === id);
    if (!s || s.deleted === 1 || ['draft', 'not_started'].includes(s.status) || Number(s.done || 0) <= 0) return;
    const primary = MY_RESPONSES[portal]?.[id] || [];
    primary.forEach(record => {
      if (SURVEY_DETAIL_EXPORT_LEGACY_DEMO_IDS.has(record.id)) record.dataOrigin = 'demo_sample';
    });
    const questions = surveyDetailExportQuestions(s);
    const existingCount = primary.filter(record => record.valid !== false && record.dataOrigin === 'demo_sample').length;
    const sampleCount = Math.max(0, 5 - existingCount);
    if (!Array.isArray(s.detailExportDemoRecords)) s.detailExportDemoRecords = [];
    for (let index = 0; index < sampleCount; index++) {
      const recordId = `DEMO-${portal}-${id}-${index + 1}`;
      if (s.detailExportDemoRecords.some(record => record.id === recordId)) continue;
      const date = surveyDetailExportDemoDate(s, index);
      const entries = questions.map(q => ({questionId: q.id, status: 'answered', value: surveyDetailExportDemoValue(q, s, portal, index, date)}));
      const external = ['public', 'qr'].includes(s.channel) && !Number(s.total || 0) || Boolean(s.allowExternal && index >= sampleCount - 2);
      s.detailExportDemoRecords.push({id: recordId, surveyId: id, dataOrigin: 'demo_sample', valid: true,
        personId: external ? '' : `demo-person-${portal}-${id}-${index + 1}`, external,
        submittedAt: `${date} ${String(8 + index).padStart(2, '0')}:${String(index * 7).padStart(2, '0')}:00`,
        questionnaireVersion: s.questionnaireVersion || 'legacy', questionSnapshot: cloneQuestions(questions), answerEntries: entries,
        answers: questions.map((q, questionIndex) => [q.title, entries[questionIndex].value, entries[questionIndex]]),
      });
    }
  }));
}
initializeSurveyDetailExportDemoData();

function surveyDetailExportDemoNotice() {
  return '<div class="filter-card subtle" data-survey-export-demo-notice role="note"><b>演示数据说明：</b>本地原型包含样例答卷。含样例的 Excel 增加“数据说明”工作表，按主表序号标注演示记录；样例不代表业务真实用户提交。</div>';
}

const surveyDetailExportDemoBaseListPage = listPage;
listPage = function() {
  const html = surveyDetailExportDemoBaseListPage();
  return state.preview === 'pc' && state.listView === 'published'
    ? html.replace('<div class="tabs">', `${surveyDetailExportDemoNotice()}<div class="tabs">`) : html;
};
const surveyDetailExportDemoBaseAllSurveysPage = allSurveysPage;
allSurveysPage = function() {
  const html = surveyDetailExportDemoBaseAllSurveysPage();
  return state.preview === 'pc' ? html.replace('<div class="filter-card all-survey-filter">', `${surveyDetailExportDemoNotice()}<div class="filter-card all-survey-filter">`) : html;
};
