const APP_FIRST_OPEN_STORAGE_KEY='survey-app-first-opened-at-v1';
function applicationFirstOpenedAt(){const openedAt=formatSystemTime();try{const saved=localStorage.getItem(APP_FIRST_OPEN_STORAGE_KEY);if(saved)return saved;localStorage.setItem(APP_FIRST_OPEN_STORAGE_KEY,openedAt);return openedAt}catch{return openedAt}}
const APP_FIRST_OPENED_AT=applicationFirstOpenedAt();
const CONFIG={
 bureau:{name:'教育局端',org:'临江县教育局',user:'王明 · 局管理员',menus:[['list','我的问卷'],['all-surveys','问卷管理'],['templates','模板中心'],['survey-types','问卷类型']],stats:[['问卷总数','128'],['进行中','18'],['本月有效答卷','12,680'],['待填写人数','1,246']],surveyTypes:[
  {id:101,name:'教研调研',description:'用于教师教学能力、课程实施及培训需求调研',source:'system',creator:'系统',createdAt:APP_FIRST_OPENED_AT},
  {id:102,name:'行政管理',description:'用于教育行政通知、工作落实及专项检查',source:'system',creator:'系统',createdAt:APP_FIRST_OPENED_AT}
 ],surveys:[
  {id:1,title:'2026年全县教师数字素养调研',type:'系统定向',channel:'internal',target:'全县中小学教师',owner:'李静',time:'08-05 至 08-20',createdAt:'2026-08-05 09:18:36',deleted:0,status:'running',statusText:'进行中',done:3268,total:3820,received:true,fillStatus:'submitted',frequency:'single',allowModify:true},
  {id:2,title:'秋季开学工作准备情况调查',type:'学校调查',channel:'internal',target:'全县72所学校',owner:'王明',time:'08-10 至 08-15',createdAt:'2026-08-10 10:25:18',deleted:0,status:'running',statusText:'进行中',done:58,total:72,received:false},
  {id:3,title:'义务教育满意度公开调查',type:'公开问卷',channel:'qr',target:'社会公众',owner:'办公室',time:'08-01 至 08-31',createdAt:'2026-08-01 14:06:52',deleted:0,status:'paused',statusText:'已暂停',done:1860,total:0,received:true,fillStatus:'not_started',allowModify:false},
  {id:4,title:'教研员培训需求调查',type:'内部调查',channel:'internal',target:'教研室全员',owner:'赵晨',time:'07-20 至 07-28',createdAt:'2026-07-18 16:42:09',deleted:0,status:'ended',statusText:'已结束',done:46,total:46,received:true,fillStatus:'submitted',frequency:'single',allowModify:true},
  {id:5,title:'校园安全专项检查信息采集',type:'学校调查',channel:'internal',target:'全县中小学',owner:'安全科',time:'未发布',createdAt:'2026-08-12 11:20:45',deleted:0,status:'draft',statusText:'草稿',done:0,total:72,received:false},
  {id:6,title:'教育系统网络安全自查',type:'内部调查',channel:'internal',target:'教育局机关全员',owner:'信息中心',time:'未发布',createdAt:'2026-08-13 08:35:26',deleted:0,status:'draft',statusText:'草稿',done:0,total:86,received:false},
  {id:8,title:'教育局机关工作满意度调查',type:'内部调查',channel:'public',allowExternal:true,target:'教育局机关全员及外部人员',owner:'王明',time:'08-03 至 08-18',createdAt:'2026-08-03 11:26:42',deleted:0,status:'paused',statusText:'已暂停',done:92,internalDone:82,externalDone:10,total:86,received:false,frequency:'single',allowModify:true},
  {id:9,title:'2026年社会公众教育意见征集',type:'公开问卷',channel:'public',target:'社会公众及其他外部人员',owner:'王明',time:'08-12 至 08-31',createdAt:'2026-08-12 14:08:25',deleted:0,status:'running',statusText:'进行中',done:286,total:0,received:false,frequency:'single',allowModify:false},
  {id:10,title:'暑期教师专题培训报名',type:'系统定向',channel:'internal',target:'全县中小学教师',owner:'王明',time:'07-01 至 07-20',createdAt:'2026-06-28 09:35:16',deleted:0,status:'ended',statusText:'已结束',done:3560,total:3820,received:false,frequency:'single',allowModify:false},
  {id:22,title:'秋季开学教育装备需求调研',surveyTypeId:101,surveyTypeName:'教研调研',channel:'internal',target:'全县中小学装备负责人',owner:'王明',time:`${collectionDefaultDate(3).slice(5)} 至 ${collectionDefaultDate(10).slice(5)}`,startDate:collectionDefaultDate(3),endDate:collectionDefaultDate(10),createdAt:formatSystemTime(),deleted:0,status:'not_started',statusText:'未开始',done:0,internalDone:0,externalDone:0,total:72,received:false,frequency:'single',allowModify:true},
  {id:18,title:'新学期教育重点工作调研',type:'学校调查',channel:'internal',target:'全县中小学',owner:'王明',time:'未发布',createdAt:'2026-08-14 08:45:30',deleted:0,status:'draft',statusText:'草稿',done:0,total:72,received:false,frequency:'single',allowModify:true},
  {id:7,title:'已删除的会议意见收集',type:'内部调查',channel:'internal',target:'办公室全员',owner:'办公室',time:'未发布',createdAt:'2026-07-10 09:00:00',deleted:1,status:'draft',statusText:'草稿',done:0,total:20,received:false}
 ]},
 school:{name:'学校端',org:'临江县实验学校',user:'陈芳 · 校管理员',menus:[['list','我的问卷'],['all-surveys','问卷管理'],['templates','模板中心'],['survey-types','问卷类型']],stats:[['问卷总数','64'],['进行中','8'],['本周有效答卷','2,486'],['待填写人数','286']],surveyTypes:[
  {id:201,name:'教学反馈',description:'用于课堂教学、作业及课程效果反馈',source:'system',creator:'系统',createdAt:APP_FIRST_OPENED_AT},
  {id:202,name:'学生信息采集',description:'用于学生健康、报名及日常信息登记',source:'system',creator:'系统',createdAt:APP_FIRST_OPENED_AT}
 ],surveys:[
  {id:11,title:'学生每日健康信息采集',type:'每日收集',channel:'internal',target:'全校学生',owner:'陈芳',time:'每日 07:00-09:00',createdAt:'2026-08-01 07:30:18',deleted:0,status:'running',statusText:'进行中',done:1245,total:1380,received:false},
  {id:12,title:'七年级学生上下学交通方式调查',type:'每日收集',channel:'internal',target:'七年级学生',owner:'张老师',time:'08-11 至 08-16',createdAt:'2026-08-11 08:42:15',deleted:0,status:'running',statusText:'进行中',done:386,total:420,received:true,fillStatus:'submitted',frequency:'daily',allowModify:true},
  {id:13,title:'班级暑假作业完成情况',type:'每日收集',channel:'internal',target:'八年级1-6班',owner:'李老师',time:'每日 09:00',createdAt:'2026-07-28 15:12:34',deleted:0,status:'paused',statusText:'已暂停',done:218,total:252,received:true,fillStatus:'not_started',allowModify:true},
  {id:14,title:'新生报名信息登记',type:'公开问卷',channel:'public',target:'新生家长',owner:'教务处',time:'07-15 至 07-31',createdAt:'2026-07-15 10:08:46',deleted:0,status:'ended',statusText:'已结束',done:468,total:0,received:true,fillStatus:'submitted',frequency:'single',allowModify:false},
  {id:15,title:'教职工通讯录更新',type:'系统定向',channel:'internal',target:'全体教职工',owner:'办公室',time:'未发布',createdAt:'2026-08-12 16:20:31',deleted:0,status:'draft',statusText:'草稿',done:0,total:126,received:false},
  {id:16,title:'秋季家长会参与意向调查',type:'公开问卷',channel:'public',target:'全校学生家长',owner:'德育处',time:'未发布',createdAt:'2026-08-13 09:12:08',deleted:0,status:'draft',statusText:'草稿',done:0,total:1380,received:false},
  {id:18,title:'教职工数字工具使用情况调查',type:'系统定向',channel:'public',allowExternal:true,target:'全体教职工及外部人员',owner:'陈芳',time:'08-05 至 08-20',createdAt:'2026-08-05 13:20:48',deleted:0,status:'paused',statusText:'已暂停',done:133,internalDone:118,externalDone:15,total:126,received:false,frequency:'single',allowModify:true},
  {id:19,title:'校园开放日家长反馈',type:'公开问卷',channel:'public',target:'学生家长及校外访客',owner:'陈芳',time:'07-18 至 07-30',createdAt:'2026-07-17 15:42:06',deleted:0,status:'ended',statusText:'已结束',done:516,total:0,received:false,frequency:'single',allowModify:false},
  {id:20,title:'新学期班级管理情况调研',type:'内部调查',channel:'internal',target:'班主任及年级组',owner:'陈芳',time:'未发布',createdAt:'2026-08-14 09:06:28',deleted:0,status:'draft',statusText:'草稿',done:0,total:36,received:false,frequency:'single',allowModify:true},
  {id:21,title:'校园服务社会满意度调查',type:'公开问卷',channel:'public',target:'家长及其他外部人员',owner:'陈芳',time:'08-10 至 08-31',createdAt:'2026-08-10 10:18:35',deleted:0,status:'running',statusText:'进行中',done:324,total:0,received:false,frequency:'single',allowModify:false},
  {id:23,title:'新学期家校协同需求调查',surveyTypeId:201,surveyTypeName:'教学反馈',channel:'public',allowExternal:true,target:'全校学生家长',owner:'陈芳',time:`${collectionDefaultDate(3).slice(5)} 至 ${collectionDefaultDate(10).slice(5)}`,startDate:collectionDefaultDate(3),endDate:collectionDefaultDate(10),createdAt:formatSystemTime(),deleted:0,status:'not_started',statusText:'未开始',done:0,internalDone:0,externalDone:0,total:1380,received:false,frequency:'single',allowModify:true},
  {id:17,title:'已删除的社团报名表',type:'系统定向',channel:'internal',target:'全校学生',owner:'团委',time:'未发布',createdAt:'2026-07-08 13:00:00',deleted:1,status:'draft',statusText:'草稿',done:0,total:1380,received:false}
 ]}
};
function beijingDateKey(value=new Date()){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(value),read=type=>parts.find(part=>part.type===type)?.value||'';return `${read('year')}-${read('month')}-${read('day')}`}
function collectionDefaultDate(offset=0){return beijingDateKey(new Date(Date.now()+offset*86400000))}
function installDemoCoverageData(){
 const typeSeeds={
  bureau:[
   {id:103,name:'校园安全',description:'用于校园安全检查、隐患排查与整改跟踪',source:'custom',creator:'王明',createdAt:'2026-08-14 09:10:00',demoRank:3},
   {id:104,name:'家校沟通',description:'用于家长意见、家校协同与公众反馈',source:'custom',creator:'王明',createdAt:'2026-08-14 09:20:00',demoRank:4},
   {id:105,name:'专题活动',description:'用于专题活动报名、反馈与效果评估',source:'custom',creator:'王明',createdAt:'2026-08-14 09:30:00',demoRank:5},
   {id:106,name:'临时调研',description:'用于短期、低频的临时调查任务',source:'custom',creator:'王明',createdAt:'2026-08-14 09:40:00',demoRank:6}
  ],
  school:[
   {id:203,name:'校园安全',description:'用于校园安全检查、隐患排查与整改跟踪',source:'custom',creator:'陈芳',createdAt:'2026-08-14 09:10:00',demoRank:3},
   {id:204,name:'家校沟通',description:'用于家长意见、家校协同与公众反馈',source:'custom',creator:'陈芳',createdAt:'2026-08-14 09:20:00',demoRank:4},
   {id:205,name:'教师发展',description:'用于教师培训、教研成长与能力评估',source:'custom',creator:'陈芳',createdAt:'2026-08-14 09:30:00',demoRank:5},
   {id:206,name:'临时调研',description:'用于短期、低频的临时调查任务',source:'custom',creator:'陈芳',createdAt:'2026-08-14 09:40:00',demoRank:6}
  ]
 };
 const surveySeeds={
  bureau:[
   {id:30,title:'秋季教研工作启动确认',surveyTypeId:102,channel:'internal',target:'教研室全员',owner:'赵晨',time:`${collectionDefaultDate(3).slice(5)} 至 ${collectionDefaultDate(8).slice(5)}`,startDate:collectionDefaultDate(3),endDate:collectionDefaultDate(8),createdAt:'2026-08-14 10:00:00',deleted:0,status:'not_started',statusText:'未开始',done:0,total:46,received:true,fillStatus:'not_started',frequency:'single',allowModify:true,demoRank:1,widgetRank:20},
   {id:31,title:'教育信息化每日进展填报',surveyTypeId:101,channel:'internal',target:'信息中心与学校信息员',owner:'李静',time:'每日 09:00',startDate:collectionDefaultDate(-3),endDate:collectionDefaultDate(6),createdAt:'2026-08-14 10:10:00',deleted:0,status:'running',statusText:'进行中',done:12,total:86,received:true,fillStatus:'not_started',frequency:'daily',allowModify:true,dailyReminder:true,reminderTime:'09:00',demoRank:2,widgetRank:21},
   {id:32,title:'家校协同公开意见补充征集',surveyTypeId:104,channel:'public',target:'学生家长及社会公众',owner:'办公室',time:`${collectionDefaultDate(-2).slice(5)} 至 ${collectionDefaultDate(5).slice(5)}`,startDate:collectionDefaultDate(-2),endDate:collectionDefaultDate(5),createdAt:'2026-08-14 10:20:00',deleted:0,status:'running',statusText:'进行中',done:88,total:0,received:true,fillStatus:'not_started',frequency:'single',allowModify:false,demoRank:3,widgetRank:22},
   {id:33,title:'校园安全隐患每日排查',surveyTypeId:103,channel:'internal',target:'全县72所学校安全员',owner:'王明',time:'每日 16:00',startDate:collectionDefaultDate(-2),endDate:collectionDefaultDate(10),createdAt:'2026-08-14 10:30:00',deleted:0,status:'running',statusText:'进行中',done:0,total:72,received:false,frequency:'daily',allowModify:true,dailyReminder:true,reminderTime:'16:00',demoRank:6,widgetRank:23},
   {id:34,title:'家长委员会年度意见汇总',surveyTypeId:104,channel:'public',allowExternal:true,target:'学校家委会及外部家长代表',owner:'王明',time:`${collectionDefaultDate(-5).slice(5)} 至 ${collectionDefaultDate(5).slice(5)}`,startDate:collectionDefaultDate(-5),endDate:collectionDefaultDate(5),createdAt:'2026-08-14 10:40:00',deleted:0,status:'running',statusText:'进行中',done:37,internalDone:22,externalDone:15,total:72,received:false,frequency:'single',allowModify:false,demoRank:7,widgetRank:24}
  ],
  school:[
   {id:40,title:'新学期班级信息确认',surveyTypeId:202,channel:'internal',target:'全校班主任',owner:'教务处',time:`${collectionDefaultDate(3).slice(5)} 至 ${collectionDefaultDate(8).slice(5)}`,startDate:collectionDefaultDate(3),endDate:collectionDefaultDate(8),createdAt:'2026-08-14 10:00:00',deleted:0,status:'not_started',statusText:'未开始',done:0,total:36,received:true,fillStatus:'not_started',frequency:'single',allowModify:true,demoRank:1,widgetRank:20},
   {id:41,title:'课堂教学每日观察记录',surveyTypeId:201,channel:'internal',target:'全校教师',owner:'张老师',time:'每日 17:00',startDate:collectionDefaultDate(-3),endDate:collectionDefaultDate(6),createdAt:'2026-08-14 10:10:00',deleted:0,status:'running',statusText:'进行中',done:28,total:126,received:true,fillStatus:'not_started',frequency:'daily',allowModify:true,dailyReminder:true,reminderTime:'17:00',demoRank:2,widgetRank:21},
   {id:42,title:'校园服务公开意见补充征集',surveyTypeId:204,channel:'public',target:'学生家长及校外访客',owner:'德育处',time:`${collectionDefaultDate(-2).slice(5)} 至 ${collectionDefaultDate(5).slice(5)}`,startDate:collectionDefaultDate(-2),endDate:collectionDefaultDate(5),createdAt:'2026-08-14 10:20:00',deleted:0,status:'running',statusText:'进行中',done:76,total:0,received:true,fillStatus:'not_started',frequency:'single',allowModify:false,demoRank:3,widgetRank:22},
   {id:43,title:'校园安全隐患每日排查',surveyTypeId:203,channel:'internal',target:'班主任及后勤人员',owner:'陈芳',time:'每日 16:30',startDate:collectionDefaultDate(-2),endDate:collectionDefaultDate(10),createdAt:'2026-08-14 10:30:00',deleted:0,status:'running',statusText:'进行中',done:0,total:48,received:false,frequency:'daily',allowModify:true,dailyReminder:true,reminderTime:'16:30',demoRank:6,widgetRank:23},
   {id:44,title:'家校协同年度意见汇总',surveyTypeId:204,channel:'public',allowExternal:true,target:'家委会及校外家长代表',owner:'陈芳',time:`${collectionDefaultDate(-5).slice(5)} 至 ${collectionDefaultDate(5).slice(5)}`,startDate:collectionDefaultDate(-5),endDate:collectionDefaultDate(5),createdAt:'2026-08-14 10:40:00',deleted:0,status:'running',statusText:'进行中',done:54,internalDone:39,externalDone:15,total:126,received:false,frequency:'single',allowModify:false,demoRank:7,widgetRank:24}
  ]
 };
 const rankByPortal={bureau:{22:[4,1],1:[5,2],9:[8,3],8:[9,4],10:[10,5],3:[4,8],4:[5,9],2:[6,10],18:[1,30],5:[2,31],6:[3,32]},school:{23:[4,1],12:[5,2],21:[8,3],18:[9,4],19:[10,5],13:[4,8],14:[5,9],11:[6,10],20:[1,30],15:[2,31],16:[3,32]}};
 const allRankByPortal={bureau:[18,30,1,8,10,33,34,9,5,4],school:[20,40,12,18,19,43,44,21,15,14]};
 Object.entries(CONFIG).forEach(([portal,config])=>{
  config.surveyTypes.forEach((item,index)=>{if(item.demoRank==null)item.demoRank=index+1});
  typeSeeds[portal].forEach(item=>{if(!config.surveyTypes.some(existing=>existing.id===item.id))config.surveyTypes.push(item)});
  Object.entries(rankByPortal[portal]).forEach(([id,[demoRank,widgetRank]])=>{const item=config.surveys.find(s=>s.id===+id);if(item){item.demoRank=demoRank;item.widgetRank=widgetRank}});
  surveySeeds[portal].forEach(item=>{if(!config.surveys.some(existing=>existing.id===item.id))config.surveys.push(item)});
  allRankByPortal[portal].forEach((id,index)=>{const item=config.surveys.find(s=>s.id===id);if(item)item.allRank=index+1});
 });
}
installDemoCoverageData();
const state={portal:null,page:'list',listView:'received',listFilters:{title:'',owner:'',type:'',status:''},allSurveyFilters:{title:'',owner:'',start:'',end:'',status:''},pagination:{},pageSizes:{},templateFilters:{name:'',type:'all'},templateSelectOpen:false,templateSelectFilters:{name:'',type:'all'},createSurveyMenuOpen:false,surveyTypeKeyword:'',questions:[],questionMenu:-1,questionError:-1,step:1,draftTitle:'',draftDescription:'',draftSurveyTypeId:'',editingSurveyId:null,recipients:new Map(),recipientTab:'',recipientReturnPage:'',recipientExpansion:new Map(),recipientSearch:'',recipientSchoolType:'',externalRecipient:false,frequency:'single',startDate:collectionDefaultDate(),endDate:collectionDefaultDate(7),allowModify:true,dailyReminder:false,skipNonWorkday:false,reminderTime:'',channel:'internal',responseSelection:{},openQuestion:1,pcStatsQuestion:0,textAnswerViews:{},statsBack:'#all-surveys',surveyDetailBack:'#all-surveys',statsDateBySurvey:{},preview:'pc',mobileFilter:'all',mobileQuestionPicker:false,mobileSettingsSheet:'',mobileTemplateType:'all',mobileTemplateTypeOpen:false,templateTypeFilter:'all',editingSurveyTemplateId:null,mobileAnswers:{},mobileWidgetReturn:null,resourceCenterEnabled:true,attachmentSelections:{},resourceSpace:'school',resourceFolderId:'',resourceFolderName:'',resourceReturnPage:'',saveScenario:'success',saveJob:null};
const RESOURCE_FOLDERS={
 school:[
  {id:'school-teaching',name:'教学教研',writable:true,children:[{id:'school-evaluation',name:'教学评价',writable:true},{id:'school-assets',name:'校本资源',writable:true},{id:'school-research',name:'教研活动',writable:true},{id:'school-course',name:'课程教学',writable:true,children:[{id:'school-courseware',name:'课件',writable:true},{id:'school-courseware-1111',name:'1111',writable:true}]}]},
  {id:'school-shared',name:'校务共享',writable:false,children:[{id:'school-archive',name:'历史归档（只读）',writable:false}]}
 ],
 mine:[
  {id:'mine-work',name:'我的工作资料',writable:true,children:[{id:'mine-survey',name:'问卷附件',writable:true},{id:'mine-lessons',name:'备课资料',writable:true}]},
  {id:'mine-temp',name:'临时文件',writable:true}
 ]
};
const COLLECTION_FREQUENCIES=[{value:'single',label:'仅提交一次',description:'有效期内仅能新增一份答卷'},{value:'daily',label:'每日收集一次',description:'每个自然日最多新增一份答卷'}];
const DAILY_COLLECTION_DEFAULT_TIME='09:15';
function normalizedCollectionSettings(source={}){const frequency=COLLECTION_FREQUENCIES.some(item=>item.value===source.frequency)?source.frequency:'single';if(frequency!=='daily')return{frequency,skipNonWorkday:false,dailyReminder:false,reminderTime:''};const dailyReminder=source.dailyReminder===undefined?true:Boolean(source.dailyReminder);return{frequency:'daily',skipNonWorkday:Boolean(source.skipNonWorkday),dailyReminder,reminderTime:dailyReminder?String(source.reminderTime||DAILY_COLLECTION_DEFAULT_TIME):''}}
function applyCollectionSettings(source=state){return Object.assign(state,normalizedCollectionSettings(source))}
function setCollectionFrequency(value){if(value==='daily'&&state.frequency!=='daily'){Object.assign(state,{frequency:'daily',skipNonWorkday:false,dailyReminder:true,reminderTime:DAILY_COLLECTION_DEFAULT_TIME});return}applyCollectionSettings({...state,frequency:value})}
function setCollectionSkipNonWorkday(enabled){state.skipNonWorkday=state.frequency==='daily'&&Boolean(enabled)}
function setCollectionDailyReminder(enabled){if(state.frequency!=='daily'){applyCollectionSettings(state);return}state.dailyReminder=Boolean(enabled);state.reminderTime=state.dailyReminder?(state.reminderTime||DAILY_COLLECTION_DEFAULT_TIME):''}
function setCollectionReminderTime(value){state.reminderTime=state.frequency==='daily'&&state.dailyReminder?String(value||''):''}
let SURVEY_TEMPLATE_STORE=null;
const MY_RESPONSES={
 bureau:{
  1:[
   {id:'B1-20260813-02',surveyId:1,personId:'bureau-person-wangming',submittedAt:'2026-08-13 08:36:12',valid:true,answers:[['您目前主要任教的学段是？','初中'],['您在教学中使用过哪些数字化工具？','智慧课堂、资源平台'],['您希望获得哪些方面的培训支持？','数据分析与人工智能辅助教学']]},
   {id:'B1-20260810-01',surveyId:1,personId:'bureau-person-wangming',submittedAt:'2026-08-10 16:20:45',valid:true,answers:[['您目前主要任教的学段是？','初中'],['您在教学中使用过哪些数字化工具？','智慧课堂'],['您希望获得哪些方面的培训支持？','数字资源制作']]}
  ],
  4:[{id:'B4-20260725-01',surveyId:4,personId:'bureau-person-wangming',submittedAt:'2026-07-25 10:18:32',valid:true,answers:[['您目前主要任教的学段是？','小学'],['您在教学中使用过哪些数字化工具？','资源平台'],['您希望获得哪些方面的培训支持？','课堂教学设计']]}]
 },
 school:{
  12:[{id:'S12-20260813-01',surveyId:12,personId:'school-person-chenfang',submittedAt:'2026-08-13 07:52:16',valid:true,answers:[['您目前主要任教的学段是？','初中'],['您在教学中使用过哪些数字化工具？','在线作业'],['您希望获得哪些方面的培训支持？','交通安全教育']]}],
  14:[{id:'S14-20260728-01',surveyId:14,personId:'school-person-chenfang',submittedAt:'2026-07-28 14:12:40',valid:true,answers:[['您目前主要任教的学段是？','小学'],['您在教学中使用过哪些数字化工具？','家校平台'],['您希望获得哪些方面的培训支持？','新生入学指导']]}]
 }
};
const DEPARTMENT_PEOPLE={bureau:[
 {id:'bureau-office',name:'办公室',children:[
  {personId:'bureau-person-wangming',name:'王明',departmentId:'bureau-office',departmentName:'办公室',position:'办公室副主任',status:'active',canReceive:true},
  {personId:'bureau-person-wumin',name:'吴敏',departmentId:'bureau-office',departmentName:'办公室',position:'行政专员',status:'active',canReceive:true},
  {personId:'bureau-person-zhengqiang',name:'郑强',departmentId:'bureau-office',departmentName:'办公室',position:'综合事务',status:'inactive',canReceive:false}
 ]},
 {id:'bureau-research',name:'教研室',children:[
  {personId:'bureau-person-lijing',name:'李静',departmentId:'bureau-research',departmentName:'教研室',position:'教研室主任',status:'active',canReceive:true},
  {personId:'bureau-person-zhoukai',name:'周凯',departmentId:'bureau-research',departmentName:'教研室',position:'数学教研员',status:'active',canReceive:true},
  {personId:'bureau-person-chenjie',name:'陈洁',departmentId:'bureau-research',departmentName:'教研室',position:'语文教研员',status:'active',canReceive:true}
 ]},
 {id:'bureau-info',name:'信息中心',children:[
  {personId:'bureau-person-chenhao',name:'陈浩',departmentId:'bureau-info',departmentName:'信息中心',position:'信息中心主任',status:'active',canReceive:true},
  {personId:'bureau-person-liuyang',name:'刘洋',departmentId:'bureau-info',departmentName:'信息中心',position:'数据管理员',status:'active',canReceive:true},
  {personId:'bureau-person-wangming',name:'王明',departmentId:'bureau-info',departmentName:'信息中心',position:'系统管理员',status:'active',canReceive:true}
 ]}
],school:[
 {id:'school-admin',name:'行政办公室',children:[
  {personId:'school-person-chenfang',name:'陈芳',departmentId:'school-admin',departmentName:'行政办公室',position:'办公室主任',status:'active',canReceive:true},
  {personId:'school-person-lina',name:'李娜',departmentId:'school-admin',departmentName:'行政办公室',position:'行政专员',status:'active',canReceive:true},
  {personId:'school-person-wangjun',name:'王军',departmentId:'school-admin',departmentName:'行政办公室',position:'人事专员',status:'active',canReceive:true},
  {personId:'school-person-zhaoqiang',name:'赵强',departmentId:'school-admin',departmentName:'行政办公室',position:'综合事务',status:'inactive',canReceive:false}
 ]},
 {id:'school-teaching',name:'教务处',children:[
  {personId:'school-person-zhouyan',name:'周燕',departmentId:'school-teaching',departmentName:'教务处',position:'教务主任',status:'active',canReceive:true},
  {personId:'school-person-sunlei',name:'孙磊',departmentId:'school-teaching',departmentName:'教务处',position:'教务员',status:'active',canReceive:true},
  {personId:'school-person-zhangmin',name:'张敏',departmentId:'school-teaching',departmentName:'教务处',position:'学籍管理员',status:'active',canReceive:true}
 ]},
 {id:'school-grade',name:'年级组',children:[
  {personId:'school-person-liwei',name:'李伟',departmentId:'school-grade',departmentName:'年级组',position:'七年级组长',status:'active',canReceive:true},
  {personId:'school-person-wangfang',name:'王芳',departmentId:'school-grade',departmentName:'年级组',position:'八年级组长',status:'active',canReceive:true},
  {personId:'school-person-zhangtao',name:'张涛',departmentId:'school-grade',departmentName:'年级组',position:'九年级组长',status:'active',canReceive:true},
  {personId:'school-person-zhouyan',name:'周燕',departmentId:'school-grade',departmentName:'年级组',position:'年级教学协调员',status:'active',canReceive:true}
 ]},
 {id:'school-logistics',name:'后勤保障部',children:[
  {personId:'school-person-liuhao',name:'刘浩',departmentId:'school-logistics',departmentName:'后勤保障部',position:'后勤专员',status:'inactive',canReceive:false}
 ]}
]};
const DEPARTMENT_ROOTS={bureau:{id:'bureau-department-root',name:'教育局机关'},school:{id:'school-department-root',name:'校内部门'}};
Object.entries(DEPARTMENT_PEOPLE).forEach(([portal,groups])=>{const root=DEPARTMENT_ROOTS[portal];if(!groups.some(group=>group.id===root.id))groups.unshift({...root,parentId:'',children:[],isLeaf:false});groups.forEach(group=>{if(group.id!==root.id&&!group.parentId)group.parentId=root.id;else group.parentId=group.parentId||'';group.isLeaf=group.isLeaf!==false&&!groups.some(candidate=>candidate.parentId===group.id);group.activeReceivableCount=group.children.filter(person=>person.status==='active'&&person.canReceive!==false).length})});
const RECIPIENT_DATA={bureau:{department:DEPARTMENT_PEOPLE.bureau,school:[{id:'school-experiment',name:'临江县实验学校',type:'九年一贯制',count:1580},{id:'school-first',name:'临江县第一小学',type:'小学',count:920},{id:'school-second',name:'临江县第二中学',type:'初中',count:1160},{id:'school-city',name:'城关小学',type:'小学',count:780}]},school:{department:DEPARTMENT_PEOPLE.school,parent:[{id:'parent7',name:'七年级家长',count:420,children:[['parent7-1','七年级1班家长',52],['parent7-2','七年级2班家长',54],['parent7-3','七年级3班家长',53]]},{id:'parent8',name:'八年级家长',count:412,children:[['parent8-1','八年级1班家长',51],['parent8-2','八年级2班家长',52],['parent8-3','八年级3班家长',50]]}],class:[{id:'class7',name:'七年级',count:420,children:[['class7-1','七年级1班',52],['class7-2','七年级2班',54],['class7-3','七年级3班',53]]},{id:'class8',name:'八年级',count:412,children:[['class8-1','八年级1班',51],['class8-2','八年级2班',52],['class8-3','八年级3班',50]]},{id:'class9',name:'九年级',count:398,children:[['class9-1','九年级1班',49],['class9-2','九年级2班',50],['class9-3','九年级3班',48]]}]}};
const SCHOOL_ROLES=[['admin','管理员',1,'默认角色'],['principal','校长',1,'默认职位'],['department-head','部门负责人',8,'默认职位'],['campus-head','校区负责人',2,'默认职位'],['stage-head','学段负责人',3,'默认职位'],['grade-head','年级负责人',9,'默认职位'],['head-teacher','班主任',28,'默认职位'],['subject-teacher','任课老师',66,'默认职位'],['dorm-admin','宿舍管理员',4,'默认职位'],['academic-affairs','教务',5,'默认职位']];
const RECIPIENT_WORKGROUP_TREE_V2=[
 {id:'bureau-workgroup-quality',name:'教育质量提升工作组',memberIds:['bureau-person-lijing','bureau-person-zhoukai','bureau-person-chenjie']},
 {id:'bureau-workgroup-security',name:'校园安全工作组',memberIds:['bureau-person-wangming','bureau-person-wumin']},
 {id:'bureau-workgroup-digital',name:'教育数字化工作组',memberIds:['bureau-person-chenhao','bureau-person-liuyang']}
];
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function decodeRoutePart(value){try{return decodeURIComponent(value||'')}catch{return''}}

const PRD_FIELD_GROUPS={
 surveyFilters:[
  ['问卷名称','选填；最多 50 个字符；输入即筛选；去除首尾空格。','state.listFilters.title / data-title'],['创建人','选填；最多 50 个字符；输入即筛选；去除首尾空格。','state.listFilters.owner / data-owner'],['问卷类型','选填；从当前组织有效类型中单选。','state.listFilters.type / data-type'],['问卷状态','选填；我收到的仅包含进行中、已暂停、已结束；我发布的包含草稿、未开始、进行中、已暂停、已结束。','state.listFilters.status / data-status']
 ],
 surveyList:[
  ['问卷名称','只读；空值显示“—”。','CONFIG[state.portal].surveys[].title'],['问卷类型','只读；按 surveyTypeId 查询当前端类型名称。','surveyTypeName(s.surveyTypeId)'],['发送人数','内部问卷展示实时解析的有效接收人数；公开/二维码问卷展示“—”。','sentCount(s) / syncDynamicSurveyRecipientTotal(s)'],['提交人数','无值按 0 展示；已提交人员退出范围后仍保留。','submittedCount(s)'],['状态','展示状态文案与颜色标签。','s.status / s.statusText'],['填写状态','仅我收到的展示未填写或已填写；未提交成功前统一为未填写。','fillStatusKey(s)'],['创建人/时间','只读；时间精确到秒。','s.owner / s.createdAt'],['操作','草稿与已暂停支持删除；未开始、进行中与已结束不展示删除入口。','receivedActions(s) / publishedActions(s)']
 ],
 response:[
  ['任教学段','必填；小学、初中、高中三选一。','select 输入；保存至 MY_RESPONSES[].answers[0]'],['数字化工具','必填；最多 200 个字符；去除首尾空格。','input 输入；保存至 MY_RESPONSES[].answers[1]'],['培训支持','必填；最多 500 个字符；去除首尾空格。','textarea 输入；保存至 MY_RESPONSES[].answers[2]'],['提交时间/答卷编号','只读；提交时间精确到秒，历史按时间倒序；新增答卷保存 personId。','responseTimestamp() / responseRecords(s)'],['提交后状态','答卷提交成功后永久只读，仅支持查看，不提供修改入口或修改确认操作。','responseDetailPage() / mobileFormContent()']
 ],
 allSurveyFilters:[
  ['问卷名称','选填；最多 50 个字符；输入即筛选。','state.allSurveyFilters.title / data-title'],['创建人员','选填；最多 50 个字符；输入即筛选。','state.allSurveyFilters.owner / data-owner'],['开始/结束日期','选填；YYYY-MM-DD；开始日期不得晚于结束日期。','state.allSurveyFilters.start/end / data-created-date'],['问卷状态','选填；仅支持未开始、进行中、已暂停、已结束，按状态精确匹配。','state.allSurveyFilters.status / data-status']
 ],
 surveyDetail:[
  ['问卷标题/类型/状态','只读；类型按 surveyTypeId 查询当前端类型名称；已删除或越权时展示不可用空态。','s.title / surveyTypeLabel(s) / s.status / s.statusText'],
  ['创建人员/时间','只读；创建时间精确到秒。','s.owner / s.createdAt'],
  ['接收人员','只读；展示发布时保存的人员及动态范围摘要。','s.target / s.recipientSnapshot'],
  ['数据范围','按实际接收分类去重并按固定顺序组合；详情不展示发布渠道。','surveyDataScope(s) / s.recipientSnapshot / s.allowExternal / s.channel'],
  ['发送人数','动态范围按当前有效内部人员实时解析，并与已有内部答卷人员合并。','syncDynamicSurveyRecipientTotal(s)'],
  ['已提交','仅统计内部接收人员的有效提交人数，不包含外部人员提交。','statsSnapshot(s).internalDone'],
  ['未提交','max(0，应提交内部人数 - 内部有效提交数)；不计外部人员；纯外部显示“—”。','statsSnapshot(s).pending'],
  ['外部提交数','统计外部人员通过微信扫描二维码提交的有效问卷份数。','statsSnapshot(s).externalDone'],
  ['完成率','已提交 ÷（已提交 + 未提交），四舍五入；不计算外部提交数，纯外部显示“—”。','statsSnapshot(s).rate'],
  ['题目列表','优先使用问卷题目结构，否则使用演示题目。','surveyDetailQuestions(s) / surveyQuestions(s)']
 ],
 createBasic:[
  ['问卷标题','必填；1～50 个字符；去除首尾空格；为空提示“请输入问卷标题”。','state.draftTitle'],['问卷类型','必填；仅可选择当前端有效问卷类型。','state.draftSurveyTypeId'],['问卷说明','选填；最多 500 个字符；去除首尾空格。','基础信息表单输入'],['当前步骤','只读；基础信息为第 1 步。','state.step']
 ],
 templateBasic:[
  ['模板名称','必填；1～50 个字符；去除首尾空格；为空提示“请输入模板名称”。','state.draftTitle'],['问卷类型','必填；仅可选择当前端有效问卷类型。','state.draftSurveyTypeId'],['问卷说明','选填；最多 500 个字符；去除首尾空格。','基础信息表单输入'],['当前步骤','只读；基础信息为第 1 步。','state.step']
 ],
 createEditor:[
  ['题目数量','1～100 题；达到 100 题后禁止继续添加。','state.questions.length'],
  ['题目标题','必填；1～200 个字符；去除首尾空格。','state.questions[].title'],
  ['题目类型','新增题目时确定；加入问卷或模板后仅展示只读类型标签，不支持修改。','state.questions[].type'],
  ['是否必答','布尔值；默认否，模板值可覆盖。','state.questions[].required'],
  ['选项','单选/多选必填；2～20 项；每项 1～50 字符；移除空行。','state.questions[].options[]']
 ],
 recipients:[
  ['接收对象模块','PC 与移动端均纵向展示；教育局端为内部部门、工作组、学校，学校端为内部部门、家长、班级。','recipientOverviewTabs()'],['模块选择规则','各模块均为非必填；可组合选择内部范围，或在收集设置中开启外部填写后发布纯外部问卷。','recipientSelectionError()'],['添加人员','各模块右侧固定展示“添加人员”，点击后进入对应分类选择器；完成后返回模块总览且不清除其他模块选择。','beginRecipientPicker() / commitRecipientPicker()'],['接收对象搜索','选填；最多 50 个字符；搜索仅过滤展示，选择部门或工作组仍覆盖完整范围。','state.recipientPickerSearch / state.recipientPickerGroupSearch'],['动态范围','部门及具有直接成员的工作组可勾选；编辑态保留范围语义，发布时展开并固化有效人员快照。','recipientScopeSelectionKey() / selectedRecipientSnapshot()'],['成员联动','范围全选；选择部分成员时显示半选；范围内取消成员后转为其余当前成员的明确人员选择。','recipientScopeState() / convertDraftScopeToPeople()'],['有效人员','仅解析 status=active 且 canReceive=true 的实名人员；空范围和纯目录不可选择。','recipientResolvedSelection()'],['预计人数','部门、工作组和明确人员按 personId 去重。','recipientCategoryCount() / recipientCount()'],['发布范围','发布确认时展开范围、按 personId 去重并固化人员快照；发布后组织变化不回写。','selectedRecipientSnapshot() / normalizeRecipientMap()']
 ],
 publish:[
  ['是否允许外部人员填写','布尔值；开启后发布渠道为 public；开启时允许不选择内部接收对象并发布纯外部问卷。','state.externalRecipient'],['外部填写说明','只读；外部人员可以通过微信扫描二维码进行填写。','固定说明文案'],['收集方式','必填；支持仅提交一次、每日收集一次。','state.frequency / COLLECTION_FREQUENCIES'],['开始日期','必填；YYYY-MM-DD；按北京时间当日 00:00:00 生效。','state.startDate'],['截止日期','必填；YYYY-MM-DD，且不得早于开始日期；按北京时间当日 23:59:59 结束。','state.endDate'],['非工作日不收集','仅选择“每日收集一次”时展示；其他收集方式隐藏并保存 false。','state.skipNonWorkday'],['每日收集提醒','仅选择“每日收集一次”时展示；其他收集方式隐藏并保存 false。','state.dailyReminder'],['提醒时间','仅每日收集且提醒开启时展示并必填；关闭提醒或选择其他收集方式时隐藏并保存为空，重新开启提醒默认 09:15。','state.reminderTime'],['时间状态','发布后按日期自动计算未开始、进行中或已结束；暂停和提前结束按状态优先级处理。','syncSurveyTemporalStatus(s)']
 ],
 templates:[
  ['模板名称','筛选输入最多 50 个字符；列表名称为空显示“—”。','SURVEY_TEMPLATE_STORE[].title'],['问卷类型','必填；按 surveyTypeId 关联当前端问卷类型。','SURVEY_TEMPLATE_STORE[].surveyTypeId'],['问卷说明','选填；最多 500 个字符。','SURVEY_TEMPLATE_STORE[].description'],['模板内容','只读摘要；由前四道非空题目标题生成。','SURVEY_TEMPLATE_STORE[].summary'],['题目结构','保存题目 ID、题型、标题、必答、选项及题型专属设置。','SURVEY_TEMPLATE_STORE[].questions'],['使用模板','仅带入模板名称、问卷类型、问卷说明和题目结构；接收对象与收集设置使用新问卷默认值。','loadSurveyTemplateForCreation()'],['创建人/时间','系统模板与自定义模板均保留来源信息。','creator / createdAt / source']
 ],
 stats:[
  ['问卷名称/创建时间','只读。','statsSurveys() -> s.title / s.createdAt'],
  ['已提交','仅统计内部接收人员的有效提交人数，不包含外部人员提交。','statsSnapshot(s).internalDone'],
  ['未提交','max(0，应提交内部人数 - 内部有效提交数)；不计外部人员；无内部人数时显示“—”。','statsSnapshot(s).pending'],
  ['外部提交数','统计外部人员通过微信扫描二维码提交的有效问卷份数；不可点击且不提供人员明细。','statsSnapshot(s).externalDone'],
  ['完成率','已提交 ÷（已提交 + 未提交），四舍五入；不计算外部提交数，无内部人数时显示“—”。','statsSnapshot(s).rate'],
  ['题目统计','按全部有效答卷统计，包含内部与外部提交。','statsQuestions(s) / questionStatBody(q,...)'],
  ['人员明细','已提交与未提交明细及下载均只包含内部人员；外部提交单独统计且不提供人员明细。','statsPeopleData(kind,s)']
 ],
 resourceCenter:[
  ['能力入口【前置条件】','学校端文件上传题展示“另存为”；点击时校验校园资源应用是否开启，未开启时提示联系学校管理员开通。','resourceCenterAvailable() / state.resourceCenterEnabled'],['附件范围','点击“另存为”后默认保存该题全部有效上传文件，包括未加载及分页外数据；不提供逐个选择、取消选择或排除能力。','selectedAttachmentFiles(context) / q.count'],['资源空间','目标空间为“学校资源”或“我的资源”；切换空间时清空已选父目录。','state.resourceSpace / data-resource-space'],['父目录选择','仅有写入权限的目录可选；未选择可写目录时“确定”按钮禁用。','state.resourceFolderId / resourceFolderById()'],['子文件夹名称','确认父目录后输入新建子文件夹名称；名称必填、最多20个字符，提交时去除首尾空格。','state.resourceFolderName / maxlength=20'],['文件夹重名','新名称不得与所选父目录下已有文件夹重名；按不区分大小写比对，重名时保留输入并提示修改。','resourceFolderNameValidation()'],['保存任务','校验通过后在父目录下创建子文件夹，并将该题全部文件保存到新文件夹；运行中禁止重复创建任务。','startResourceSave() / state.saveJob'],['保存进度','任务执行期间仅展示进度条及百分比，不展示文件名、文件数量、速度、剩余时间、取消操作或结果汇总。','saveProgressMarkup(job)'],['研发接口【假设】','需提供校园资源开通状态、可写目录查询、同级目录重名校验、文件夹创建、保存任务创建及任务状态查询能力；服务端重新校验问卷访问权、附件有效性、目录写入权和存储容量。','当前为前端异步任务模拟，未接入真实接口']
 ],
 surveyTypes:[
  ['类型名称筛选','选填；最多 50 个字符；输入即筛选。','survey-type-keyword / data-type-name'],['类型名称','新增/编辑必填；1～20 个字符；同一端不可重名；系统预置类型不显示来源标识且不可编辑。','CONFIG[state.portal].surveyTypes[].name'],['类型说明','选填；最多 100 个字符。','surveyTypes[].description'],['关联问卷数','只读；按当前端未删除问卷动态统计。','surveyTypeSurveyCount(typeId)'],['关联模板数','只读；按当前端问卷模板动态统计。','surveyTypeTemplateCount(typeId)'],['创建人/时间','只读；系统预置类型使用浏览器长期保存的应用首次打开时间，自定义类型使用实际新增时间。','creator / APP_FIRST_OPENED_AT / formatSystemTime()'],['操作','系统预置类型操作单元格为空；自定义类型展示编辑、删除。','source / edit-survey-type / delete-survey-type']
 ],
 mobileAnswer:[
  ['姓名','必填；1～20 个字符；去除首尾空格。','state.mobileAnswers[surveyId].name'],['性别','必填；男、女二选一。','state.mobileAnswers[surveyId].gender'],['微信号','选填；6～20 个字符；字母开头，仅字母、数字、下划线、连字符。','state.mobileAnswers[surveyId].wechat'],['QQ号','选填；5～12 位数字。','state.mobileAnswers[surveyId].qq'],['只读状态','已提交答卷禁用全部填写字段，仅支持查看，不展示修改按钮。','s.fillStatus === submitted']
 ],
 mobileCreate:[
  ['问卷标题','必填；1～50 个字符；去除首尾空格。','state.draftTitle'],['问卷类型','必填；仅可选择当前端有效问卷类型。','state.draftSurveyTypeId'],['填写描述','选填；最多 500 个字符。','mobile-description 输入'],['题目列表','1～100 题；标题与类型来自 state.questions。','state.questions[]']
 ],
 pagination:[
  ['每页展示条数','仅 PC 列表展示；可选 10、20、50、100 条，默认 10 条。','PAGE_SIZE_OPTIONS / pageSizeFor(key)'],['移动端列表','不展示页码、上一页或下一页控件；当前筛选结果一次性展示，底部仅保留记录数。','paginateItems() / paginationComponent()'],['状态隔离','PC 端按当前端和列表标识独立记忆；“我的问卷”中“我收到的”和“我发布的”分别记录；仅本次应用打开期间有效。','state.pageSizes[paginationStateKey(key)]'],['切换规则','PC 切换条数后回到第 1 页并重新计算总页数；筛选条件保持不变，后续筛选仅重置页码。','setPageSize() / paginateItems()']
 ],
 auth:[
  ['人员/部门/角色','只读演示数据。','authPage() 内授权数据'],['创建范围/结果权限','只读演示权限口径。','authPage() 内授权数据'],['状态','启用状态使用 running 标签样式。','authPage() 内演示状态']
 ],
 approval:[
  ['问卷名称/申请人','只读演示数据。','approvalPage() 内审批数据'],['申请范围/时间/原因','只读；时间精确到秒。','approvalPage() 内审批数据'],['审批操作','同意或驳回后当前行转为结果状态。','action(approve/reject)']
 ]
};
const prdFields=(...groups)=>groups.flatMap(key=>PRD_FIELD_GROUPS[key]||[]);
const PRD_PAGE_RULES={
 'cloud-widget':{title:'问卷调研首页统计组件｜数据与后端实现规则',goal:'明确教育局 PC 首页统计组件的数据来源、统计周期、计算公式、接口和权限规则。',fields:[]},
 'mobile-widget':{title:'问卷调研首页组件｜数据与后端实现规则',goal:'明确移动端两项统计与最新五条组织问卷的数据来源、状态、跳转、空态、接口和权限规则。',fields:[]},
 list:{title:'我的问卷',goal:'筛选、查看并操作本人收到或发布的问卷。',fields:prdFields('surveyFilters','surveyList','pagination')},
 'list-response':{title:'本人答卷',goal:'查看当前用户的有效答卷及历次提交记录。',fields:prdFields('surveyList','response')},
 'list-fill':{title:'填写或修改答卷',goal:'新增答卷或在允许时更新指定原答卷。',fields:prdFields('response')},
 'all-surveys':{title:'问卷管理',goal:'查看当前组织内所有已发布且未删除的问卷；草稿仅在“我的问卷”中展示。',fields:prdFields('allSurveyFilters','surveyList','pagination')},
 'all-surveys-detail':{title:'问卷详情',goal:'只读查看问卷配置、接收范围和答卷明细。',fields:prdFields('surveyDetail').filter(row=>!['发送/提交/未提交','完成率'].includes(row[0]))},
 'create-basic':{title:'创建问卷｜基础信息',goal:'录入问卷标题与填写说明。',fields:prdFields('createBasic')},
 'create-editor':{title:'创建问卷｜问卷设计',goal:'添加、排序和配置问卷题目。',fields:prdFields('createEditor')},
 'create-recipients':{title:'创建问卷｜接收人员',goal:'选择问卷的内部接收对象。',fields:prdFields('recipients')},
 'create-publish':{title:'创建问卷｜收集设置',goal:'统一配置外部填写、收集方式、收集日期和每日提醒规则。',fields:prdFields('publish')},
 'templates-survey':{title:'模板中心｜问卷模板',goal:'筛选、使用或维护问卷模板。',fields:prdFields('templates','pagination')},
 'list-template-select':{title:'选择问卷模板',goal:'从当前端有效问卷模板中筛选并选择一个模板创建问卷。',fields:prdFields('templates','pagination')},
 'template-basic':{title:'问卷模板｜基础信息',goal:'新增或编辑问卷模板的基础信息。',fields:prdFields('templateBasic')},
 'template-editor':{title:'问卷模板｜问卷设计',goal:'配置模板包含的题目结构。',fields:prdFields('createEditor')},
 'survey-types':{title:'问卷类型',goal:'筛选并维护当前组织的问卷类型。',fields:prdFields('surveyTypes','pagination')},
 auth:{title:'权限管理',goal:'查看并维护教育局端问卷权限。',fields:prdFields('auth','pagination')},
 approval:{title:'发布审批',goal:'处理超出授权范围的问卷发布申请。',fields:prdFields('approval','pagination')},
 stats:{title:'问卷统计',goal:'查看问卷提交进度并进入统计详情。',fields:prdFields('stats','pagination')},
 'stats-detail':{title:'统计详情',goal:'查看单份问卷的提交数据与逐题统计，并在满足资源中心权限时选择文件/图片附件进行批量另存。',fields:prdFields('surveyDetail','stats','resourceCenter')},
 'stats-save-folder':{title:'保存到文件夹',goal:'在移动端从学校资源或我的资源中选择可写文件夹，并提交附件批量保存任务。',fields:prdFields('resourceCenter')},
 'stats-people':{title:'填写明细',goal:'查看并下载已提交或未提交人员明细。',fields:prdFields('stats')},
 'mobile-fill-list':{title:'移动端填写列表',goal:'按填写状态查看当前用户收到的问卷。',fields:prdFields('surveyList')},
 'mobile-form':{title:'移动端问卷填写',goal:'填写、查看或修改当前问卷答卷。',fields:prdFields('mobileAnswer')},
 'mobile-complete':{title:'移动端提交完成',goal:'确认答卷已提交并进入提交结果查看。',fields:prdFields('mobileAnswer')},
 'mobile-templates':{title:'移动端模板选择',goal:'按问卷类型筛选模板或自定义创建。',fields:prdFields('templates','surveyTypes')},
 'mobile-create':{title:'移动端创建问卷',goal:'录入基础信息并添加问卷题目。',fields:prdFields('mobileCreate','createEditor')},
 'mobile-settings':{title:'移动端收集设置',goal:'配置外部填写、收集方式、收集日期和每日提醒规则。',fields:prdFields('publish')},
 'mobile-recipients':{title:'移动端选择成员',goal:'按纵向分类模块组合选择问卷接收人员。',fields:prdFields('recipients')}
};
/* External recipient compatibility scripts still write this retired key while loading.
 * Keep a non-enumerable placeholder only until all scripts have initialized. */
const RETIRED_TEMPLATE_RECIPIENT_PRD_KEY=['template','recipients'].join('-');
Object.defineProperty(PRD_PAGE_RULES,RETIRED_TEMPLATE_RECIPIENT_PRD_KEY,{value:{title:'',goal:'',fields:[]},enumerable:false,configurable:true,writable:true});
const PRD_OVERLAY_RULES={
 'question-picker':{title:'添加问题',goal:'从常用问题或自定义题型中添加一道题。',fields:prdFields('createEditor')},
 'survey-type':{title:'问卷类型新增/编辑',goal:'新增或修改当前组织的问卷类型。',fields:prdFields('surveyTypes')},
 confirmation:{title:'操作确认',goal:'在执行发布、提交、暂停、结束或删除前进行二次确认。',fields:[['标题','只读；由当前业务动作生成。','modal(title,...) 的 title'],['说明','只读；说明操作对象和影响范围。','modal(title,text,...) 的 text'],['确认按钮','点击后先关闭确认框，再执行回调；取消不改变业务数据。','modal() 的 ok / cb']]},
 qr:{title:'问卷二维码',goal:'展示、下载二维码并进入扫码填写实例。',fields:[['问卷名称','只读。','s.title'],['二维码内容','根据端、问卷 ID、渠道和标题生成。','externalQrPayload(s) / qrMatrix(payload)'],['可填写状态','仅进行中问卷允许扫码提交。','s.status === running'],['下载文件名','由问卷标题生成并清理非法字符。','downloadQr(qr,s.title)']]},
 'qr-preview':{title:'扫码填写实例',goal:'预览外部人员扫码后的问卷填写界面。',fields:prdFields('mobileAnswer')},
 'stats-actions':{title:'统计更多操作',goal:'根据问卷状态和渠道提供二维码、暂停、恢复、结束与删除操作。',fields:prdFields('surveyDetail')},
 'resource-picker':{title:'保存到文件夹',goal:'从学校资源或我的资源中选择具有写入权限的父目录，确认后为本次整题附件保存任务创建子文件夹。',fields:prdFields('resourceCenter')},
 'save-progress':{title:'附件保存进度',goal:'保存期间仅展示实时进度条及百分比。',fields:prdFields('resourceCenter')},
 'settings-choice':{title:'收集方式选项',goal:'选择仅提交一次或每日收集一次。',fields:prdFields('publish')},
 'asset-preview':{title:'统计资源预览',goal:'预览答卷中的图片或签字内容。',fields:[['资源类型','图片或签字。','trigger.dataset.statPreview'],['资源标题','只读；空值显示空字符串。','trigger.dataset.previewTitle'],['提交人/时间','只读元数据。','previewSubmitter / previewTime']]},
 'template-select':{title:'选择问卷模板',goal:'在我的问卷页面筛选并选择当前端模板，直接进入新增问卷流程。',fields:[['模板名称','最多 50 字，按模板名称模糊匹配。','state.templateSelectFilters.name'],['问卷类型','单选当前端有效问卷类型，默认全部。','state.templateSelectFilters.type'],['列表字段','仅展示序号、模板名称、问卷类型和创建时间。','surveyTemplateItems()'],['问卷类型','展示模板关联的当前端问卷类型名称。','surveyTypeName(template.surveyTypeId)'],['选择模板','点击整行或按 Enter、Space 后校验模板及类型，并进入新增问卷第一步。','selectTemplateForCreation(templateId)'],['关闭方式','关闭按钮、遮罩和 Escape 均关闭弹窗，不改变我的问卷筛选状态。','closeTemplateSelectionModal()']]},
 'template-type-picker':{title:'问卷类型筛选',goal:'选择移动端模板列表的问卷类型。',fields:[['类型选项','包含“全部问卷类型”和当前端类型。','CONFIG[state.portal].surveyTypes'],['当前选项','单选；无效 ID 自动回退为全部。','state.mobileTemplateType']]}
};
function currentPrdPageKey(){
 const p=state.page.split('/');
 if(state.page==='list/template-select')return'list-template-select';
 if(state.page==='list/create'||state.page.startsWith('list/edit/'))return`create-${['basic','editor','recipients','publish'][state.step-1]||'basic'}`;
 if(state.page==='templates/create'||state.page.startsWith('templates/edit/'))return`template-${['basic','editor'][state.step-1]||'basic'}`;
 if(state.page==='templates')return'templates-survey';
 if(state.page.startsWith('list/response/'))return'list-response';
 if(state.page.startsWith('list/fill/'))return'list-fill';
 if(state.page.startsWith('all-surveys/'))return'all-surveys-detail';
 if(state.page.startsWith('stats/detail/'))return'stats-detail';
 if(state.page.startsWith('stats/save-folder/'))return'stats-save-folder';
 if(state.page.startsWith('stats/people/'))return'stats-people';
 if(state.page==='mobile/fill')return'mobile-fill-list';
 if(p[0]==='mobile'&&p[1]==='fill'&&p[2])return'mobile-form';
 if(p[0]==='mobile'&&p[1]==='complete')return'mobile-complete';
 if(p[0]==='mobile')return`mobile-${p[1]||'fill-list'}`;
 return state.page;
}
function prdTrack(event,entryType,key,closeMethod=''){
 const record={event,portal:state.portal,device:state.preview,page_key:currentPrdPageKey(),overlay_key:entryType==='overlay'?key:'',entry_type:entryType,close_method:closeMethod,timestamp:formatSystemTime()};
 window.__prdEvents=window.__prdEvents||[];window.__prdEvents.push(record);
}
function prdFeatureRows(rule){return[
 ['规则入口','查看当前界面 PRD',`点击右上角“prd”打开《${rule.title}》规则，不改变当前业务状态。`,'P0','按钮固定小写'],
 ['字段口径','字段限制与来源',`逐字段展示输入限制、前端来源、计算方式和空值处理。`,'P0',`${rule.fields.length} 个字段口径`],
 ['交互反馈','关闭与恢复','支持关闭按钮、遮罩和 Escape；关闭后返回原界面。','P0','不触发页面重渲染']
]}
function prdTable(headers,rows,klass='',highlightPrefix=''){
 return `<div class="prd-table-wrap"><table class="prd-table ${klass}"><thead><tr>${headers.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr class="${highlightPrefix&&String(row[0]).startsWith(highlightPrefix)?'prd-prerequisite-row':''}">${row.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
}
function renderPrdDocument(rule,key,entryType){
 if(entryType==='page'&&(key==='cloud-widget'||key==='mobile-widget'))return renderCloudWidgetPrd(rule,key);
	 const isRecipientSelector=entryType==='page'&&['create-recipients','mobile-recipients'].includes(key),isCollectionSettings=(entryType==='page'&&['create-publish','mobile-settings'].includes(key))||(entryType==='overlay'&&key==='settings-choice'),isSurveyManagement=entryType==='page'&&key==='list',isSurveyTypes=entryType==='page'&&key==='survey-types',featureRows=prdFeatureRows(rule);if(isRecipientSelector)featureRows.push(['部门与工作组','动态范围','部门及具有直接成员的工作组叶节点可直接勾选；纯目录节点仅用于展开。','P0','PC与移动端一致'],['成员联动','范围转人员与去重','取消动态范围中的成员后转为其余明确人员；搜索不缩小范围，所有人员按personId去重。','P0','逐人选满不自动升级'],['发布范围','保留动态对象','发布时保留 department/workgroup dynamic scope，填写与统计时按当前有效成员实时解析。','P0','旧人员快照继续兼容']);if(isCollectionSettings)featureRows.push(['收集设置','字段统一','PC 与移动端按统一顺序配置外部填写、收集方式、开始日期、截止日期及每日收集规则；非每日方式隐藏三项每日配置。','P0','PC 使用宽屏布局，移动端使用单行列表'],['收集方式','状态联动','非每日方式隐藏并清空每日配置；首次切换每日收集时使用 false、true、09:15，关闭提醒后隐藏并清空时间。','P0','问卷创建与编辑共用规范化逻辑'],['发布范围','纯外部发布','外部填写开启后允许不选择内部接收人员；内部范围与外部填写均为空时阻止发布。','P0','allowExternal 共用'],['问卷状态','日期自动计算','按北京时间日期边界计算未开始、进行中和已结束；暂停及手动结束遵循状态优先级。','P0','历史缺失日期的数据不强制改写']);if(isSurveyManagement)featureRows.push(['状态操作','操作矩阵','草稿提供编辑、删除；未开始提供查看、编辑；进行中提供统计、适用时二维码、暂停、结束；已暂停在此基础上提供恢复和删除；已结束仅保留统计及适用二维码。','P0','仅草稿与已暂停可删除'],['问卷编辑','原记录更新','草稿与未开始问卷按四步流程完整回填；保存或发布沿用原问卷 ID，不新增重复记录。','P0','状态变化时拒绝保存'],['问卷删除','确认与软删除','草稿或已暂停问卷经二次确认后软删除，并从我的问卷、问卷管理、统计及首页数据源移除。','P0','未开始、进行中、已结束不可删除']);if(isSurveyTypes)featureRows.push(['系统预置类型','精简展示','类型名称不展示来源标识，操作单元格保持为空。','P0','底层仍禁止编辑、删除'],['创建时间','首次打开时间','系统预置类型显示浏览器长期保存的应用首次打开时间；自定义类型显示实际新增时间。','P0','教育局端与学校端同源共享']);
 const features=prdTable(['功能模块','功能点','需求描述','优先级（P0 / P1 / P2）','备注说明'],featureRows);
 const isStatsDetail=entryType==='page'&&key==='stats-detail';
 const fields=prdTable(['字段/信息','限制与展示规则','当前原型来源'],rule.fields||[],'prd-field-table',isStatsDetail?'能力入口':'');
	 const prerequisite=isStatsDetail?`<aside class="prd-prerequisite" role="note"><strong>资源中心能力展示前置条件</strong><p>仅当当前页面为学校端、问卷调研字段为文件/图片，且学校云平台返回资源中心应用已开启时，PC 端与移动端才展示附件选择框、全选及“另存为”操作模块；教育局端、普通题型、资源中心未开启、检测失败或状态不可用时均不展示。</p><small>【假设】开通状态由学校云平台提供；前端隐藏不能替代服务端保存时的授权与目录写入权限复核。</small></aside>`:isRecipientSelector?`<aside class="prd-prerequisite" role="note"><strong>动态接收范围口径</strong><p>部门和具有直接成员的工作组叶节点可保存为 dynamic scope；填写、人数及统计按当前有效且 canReceive=true 的成员实时解析。</p><small>范围与明确人员均按 personId 去重；空范围和纯目录节点不可勾选。</small></aside>`:'';
	 const flowText=isRecipientSelector?'进入部门或工作组分类后，可直接勾选动态范围，也可独立展开或进入成员页逐人选择；范围内取消成员时转换为其余当前人员，确认提交临时副本，取消或返回回滚。':isCollectionSettings?'移动端按“问卷编辑→接收人员→收集设置→发布”执行，PC 端第四步同为收集设置；开启外部填写后使用统一 allowExternal 字段。非每日方式隐藏三项每日配置并保持 false、false、空；从非每日切换为每日时显示非工作日和每日提醒，默认 false、true、09:15；关闭每日提醒时隐藏提醒时间并清空，重新开启时恢复 09:15；切回非每日方式时再次隐藏并清空。发布时校验日期及接收范围，并按北京时间计算初始状态。':isSurveyManagement?'当前用户进入“我发布的”，系统按问卷实时状态输出操作项；草稿与未开始可进入四步编辑流程，删除仅对草稿和已暂停问卷开放并要求二次确认。':'进入当前界面后按字段规则展示或录入数据；操作按钮根据当前状态生效；离开、取消或关闭时遵循原业务流程。';
	 const exceptionText=isRecipientSelector?'空部门、空工作组和纯目录节点不可勾选；搜索无结果展示空态且不改变已选范围；停用、离职或无接收权限人员不参与解析；失效范围在草稿中提示重新选择并阻止发布。':isCollectionSettings?'开始日期或截止日期为空时阻止发布并定位错误提示；截止日期早于开始日期时阻止发布；每日提醒开启但提醒时间为空时阻止发布；内部接收范围与外部填写均为空时阻止发布。历史问卷缺少日期时保留原状态。':isSurveyManagement?'问卷不存在、已删除、非当前创建人或状态已变化时阻止操作；删除确认回调再次校验状态，仅草稿或已暂停可继续；编辑期间问卷自动开始时拒绝保存，原数据保持不变。':'无权限、数据不存在或已删除时展示空态；非法输入阻止提交并给出明确提示；动态 ID 不改变本规则的字段口径。';
	 const dataText=isRecipientSelector?'动态范围键为 department:scope:{departmentId} 或 workgroup:scope:{workgroupId}；填写、人数和统计读取时按当前有效成员解析，并与已有答卷人员按personId取并集。记录recipient_scope_select、recipient_scope_unselect、recipient_scope_convert_to_people、recipient_scope_invalid及人员选择、搜索、确认、取消事件。':isCollectionSettings?'保存 startDate、endDate、allowExternal、frequency、skipNonWorkday、dailyReminder、reminderTime；问卷新建及编辑保存前统一规范化每日配置：frequency 非 daily 时保存 false、false、空，提醒关闭时 reminderTime 保存为空。新建或编辑问卷统一保存 allowModify=false，答卷提交成功后永久只读。状态值为 not_started、running、paused、ended；仅 running 计入进行中问卷。记录 recipient_publish_validation_failed，并在正式实现补充 collection_setting_change、survey_publish 与 survey_status_auto_changed。【假设】公共参数包含 portal、device、survey_id、field_name、status、start_date、end_date 和 timestamp。':isSurveyTypes?'系统预置类型的 source 保留为 system；创建时间读取 localStorage 键 survey-app-first-opened-at-v1。自定义类型继续在新增时写入实际 createdAt。打开、关闭分别记录 prd_rule_open、prd_rule_close。':'字段来源以上表为准。打开、关闭分别记录 prd_rule_open、prd_rule_close，公共参数包含 portal、device、page_key、overlay_key、entry_type 和 timestamp。';
	 const riskText=isRecipientSelector?'正式环境依赖组织通讯录、部门关系、工作组成员关系及接收权限接口；服务端必须按组织边界复核scopeType、scopeId与personId，并在读取和提交前刷新解析结果。':isCollectionSettings?'日期状态依赖服务端统一使用 Asia/Shanghai 时区并在读取及填写前重新计算；多端缓存必须同步最新状态。当前原型仅保存非工作日与每日提醒配置，不执行真实节假日判断、定时任务或消息提醒。':'当前数据为前端原型数据或派生结果；规则描述不代表已存在后端接口。PRD 查看层不得修改原业务状态。';
	 const acceptanceText=isRecipientSelector?'教育局PC和移动端可直接选择部门与有成员的工作组，学校PC和移动端可直接选择部门；范围复选框与展开或导航独立；搜索不缩小范围；取消成员正确转为明确人员；工作组选择单个或部分成员时“全选本组”保持未选中且无半选，全部成员选中后才显示选中；重叠成员按personId去重；确认提交、取消回滚；发布数据保留dynamic scope。':isCollectionSettings?'教育局端、学校端的 PC 与移动端字段、文案、顺序及开关联动一致；非每日方式不渲染三项每日配置且保存 false、false、空；切换每日方式后显示前两项，开启提醒后显示提醒时间，关闭提醒后立即隐藏；单次→每日→单次→每日及关闭→重开提醒的默认值、清空结果正确；新建、草稿和未开始编辑保存均无无效每日配置；纯内部、内外混合和纯外部均可发布，无任何范围时被阻止；空日期及日期倒置校验正确；未来、当天和过期日期分别生成未开始、进行中和已结束。':isSurveyManagement?'教育局端、学校端 PC 的五种状态操作矩阵一致；草稿与未开始问卷四步配置完整回填并更新原记录；仅草稿和已暂停可删除，未开始、进行中及已结束均无删除入口；状态变化时保存或删除被阻止。':isSurveyTypes?'两端系统预置类型均不显示来源标签和禁用文案，操作单元格为空且首次打开时间一致；刷新后时间不变；自定义类型保留实际创建时间和编辑、删除操作。':'字段限制与实际校验一致；展示字段可追溯到明确前端来源；按钮不遮挡原操作；关闭后原界面及输入内容保持不变。';
 const outScopeText=isRecipientSelector?'组织架构维护、人员入离职管理、部门负责人配置和数据库持久化。':isCollectionSettings?'历史已发布问卷日期补录、数据库迁移、后端定时任务及精确到时分秒的日期选择。':'后端接口实现、数据库持久化、入口展示页及原型端/设备切换器。';
 return `<article class="prd-document"><header class="prd-document-head"><div><small>${entryType==='page'?'页面':'弹窗'}规则 · ${esc(key)}</small><h2>${esc(rule.title)}</h2></div><button type="button" class="prd-close" aria-label="关闭 PRD 规则">×</button></header>${prerequisite}<section><h3>1. 背景与目标</h3><p>${esc(rule.goal)}</p></section><section><h3>2. 用户与使用场景</h3><p>供产品、设计、前端、后端和测试人员在当前原型上下文中核对界面规则。</p></section><section><h3>3. 需求范围</h3><h4>In Scope</h4><p>当前${entryType==='page'?'页面':'覆盖层'}的字段、展示、操作、状态和异常规则。</p><h4>Out of Scope</h4><p>${outScopeText}</p></section><section><h3>4. 功能需求列表</h3>${features}</section><section><h3>5. 核心流程与交互说明</h3><p>${flowText}</p>${fields}</section><section><h3>6. 异常场景与边界条件</h3><p>${exceptionText}</p></section><section><h3>7. 数据口径与埋点需求</h3><p>${dataText}</p></section><section><h3>8. 风险、依赖与限制</h3><p>${riskText}</p></section><section><h3>9. 验收标准</h3><p>${acceptanceText}</p></section></article>`
}
function renderCloudWidgetPrd(rule,key){return '<article class="prd-document cloud-widget-prd"><header class="prd-document-head"><h2>云首页组件规则</h2><button class="prd-close" aria-label="关闭 PRD 规则">×</button></header>'+cloudWidgetRules()+'</article>'}
function cloudWidgetRules(){return `<section><h3>1. 背景与目标</h3><p>删除教育局端、学校端应用首页模块，在云首页按设备提供精简统计与高频问卷入口。</p></section><section><h3>2. 用户与使用场景</h3><p>教育局与学校授权用户在 PC 云首页查看组织问卷概览，在移动云首页查看组织最新问卷。</p></section><section><h3>3. 需求范围</h3><h4>In Scope</h4><p>两端首页入口删除、两项统计、PC 最新五条组织问卷、移动端最新五条组织问卷、截止日期及对应跳转。</p><h4>Out of Scope</h4><p>移动端我的问卷列表、问卷创建表单、其他页面时间字段调整及后端接口实现。</p></section><section><h3>4. 功能需求列表</h3>${prdTable(['功能模块','功能点','需求描述','优先级（P0 / P1 / P2）','备注说明'],[['应用导航','删除首页','删除首页入口；默认进入我的问卷；旧首页地址重定向我的问卷。','P0','两端一致'],['云首页','顶部统计','仅显示问卷总数与进行中问卷。','P0','未开始不计入进行中'],['PC 云首页','最新五条问卷','最多展示当前组织最新五条已发布问卷，点击进入统计详情。','P0','按创建时间和 ID 倒序'],['移动云首页','最新五条问卷','展示当前组织最新五条已发布问卷、状态和截止时间，点击进入统计详情。','P0','截止日期包含年份']])}</section><section><h3>5. 核心流程与交互说明</h3><p>PC 展示两项统计与最新组织问卷，点击进入统计详情；移动端展示两项统计与最新五条组织问卷，点击进入统计详情。</p></section><section><h3>6. 异常场景与边界条件</h3><p>PC 不足五条时按实际数量展示；移动端无已发布问卷时展示“暂无问卷”。截止日期缺失展示 —，加载失败和无权限不得显示为零。</p></section><section><h3>7. 数据口径与埋点需求</h3><p>PC 列表取当前组织未删除且已发布问卷，按创建时间和 ID 倒序最多五条。移动端与 PC 均取当前组织未删除且已发布问卷，按创建时间和 ID 倒序取五条。记录 cloud_widget_open、survey_widget_entry_click、prd_rule_open、prd_rule_close；【假设】公共属性包含 portal、device、survey_id、entry_target 和 timestamp。</p></section><section><h3>8. 风险、依赖与限制</h3><p>当前为前端演示数据；正式统计依赖组织权限、个人答卷状态和聚合接口，缓存必须隔离组织、用户及权限范围。</p></section><section><h3>9. 验收标准</h3><p>两端无首页菜单；PC 最新组织问卷不超过五条并进入统计详情；移动端最新组织问卷不超过五条并进入统计详情；空态和截止日期展示正确。</p></section>`}
function closePrd(method='button'){
 const layer=$('#prd-layer');if(!layer?.classList.contains('show'))return;
 prdTrack('prd_rule_close',layer.dataset.entryType||'page',layer.dataset.ruleKey||'',method);layer.classList.remove('show');layer.innerHTML='';
}
function openPrd(key,entryType='page'){
 const rule=(entryType==='overlay'?PRD_OVERLAY_RULES:PRD_PAGE_RULES)[key];
 const fallback={title:'当前界面暂无 PRD 配置',goal:`未找到键为“${key}”的规则配置。`,fields:[['规则键','只读；用于定位缺失配置。',key]]};
 const layer=$('#prd-layer');if(!layer)return;
 layer.dataset.entryType=entryType;layer.dataset.ruleKey=key;layer.innerHTML=renderPrdDocument(rule||fallback,key,entryType);layer.classList.add('show');
 prdTrack('prd_rule_open',entryType,key);$('.prd-close',layer)?.focus();$('.prd-close',layer).onclick=()=>closePrd('button');layer.onclick=e=>{if(e.target===layer)closePrd('mask')};
}
function prdButton(key,entryType='page',extraClass=''){return `<button type="button" class="prd-trigger ${extraClass}" aria-label="查看当前${entryType==='page'?'页面':'弹窗'} PRD 规则" data-prd-key="${esc(key)}" data-prd-entry="${entryType}">prd</button>`}
function bindPrdButton(button){if(!button||button.dataset.prdBound)return;button.dataset.prdBound='1';prdTrack('prd_entry_expose',button.dataset.prdEntry||'page',button.dataset.prdKey||'');button.onclick=e=>{e.stopPropagation();openPrd(button.dataset.prdKey,button.dataset.prdEntry||'page')}}
function installPagePrdButton(){
 const key=currentPrdPageKey(),view=$('#view');if(!view)return;
 if(key==='cloud-widget'||key==='mobile-widget'){bindPrdButton($(`[data-prd-entry="page"][data-prd-key="${key}"]`,view));return}
 const mobileHead=$('.stats-mobile-head',view),pageActions=$('.page-head .head-actions',view);let host=pageActions;
 if(mobileHead){mobileHead.insertAdjacentHTML('beforeend',prdButton(key,'page','mobile-prd-trigger'));host=mobileHead}else if(!host){view.insertAdjacentHTML('afterbegin',prdButton(key,'page','floating-prd-trigger'));host=view}
 else host.insertAdjacentHTML('afterbegin',prdButton(key));
 bindPrdButton($(`[data-prd-entry="page"][data-prd-key="${key}"]`,host));
 const choice=$('.mobile-choice-sheet',view),question=$('.mobile-question-sheet',view),picker=$('.mobile-template-options',view);
 if(choice)decorateOverlay(choice,'settings-choice');if(question)decorateOverlay(question,'question-picker');if(picker)decorateOverlay(picker,'template-type-picker');
}
function decorateOverlay(container,key){if(!container)return;let button=$('.overlay-prd-trigger',container);if(!button){container.insertAdjacentHTML('afterbegin',prdButton(key,'overlay','overlay-prd-trigger'));button=$('.overlay-prd-trigger',container)}bindPrdButton(button)}
function scanOverlayPrd(){
 const selectors=[['.question-picker','question-picker'],['.qr-result','qr'],['.qr-phone-shell','qr-preview'],['.stats-action-sheet','stats-actions'],['.resource-picker-modal','resource-picker'],['.save-progress-modal','save-progress'],['.template-select-modal','template-select'],['.mobile-choice-sheet','settings-choice'],['.mobile-question-sheet','question-picker'],['.stat-preview-modal','asset-preview'],['.mobile-template-options','template-type-picker']];
 selectors.forEach(([selector,key])=>$$(selector).forEach(node=>decorateOverlay(node,key)));
 $$('#modal .modal').forEach(node=>{if(!$('.overlay-prd-trigger',node))decorateOverlay(node,$('#survey-type-name',node)?'survey-type':'confirmation')});
}
function applyRuntimeConstraints(root=document){
 const maxLengths={'#filter-title':50,'#filter-owner':50,'#all-filter-title':50,'#all-filter-owner':50,'#template-name':50,'#survey-type-keyword':50,'#object-name':50,'#recipient-search':50,'#survey-title':50,'#survey-description':500,'#mobile-title':50,'#mobile-description':500};
 Object.entries(maxLengths).forEach(([selector,value])=>$(selector,root)?.setAttribute('maxlength',String(value)));
}
function formatSystemTime(value=new Date()){const d=value instanceof Date?value:new Date(value);const pad=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`}
const MOBILE_WIDGET_MAIN_ROUTES=new Set(['mobile/fill','stats','mobile/templates']);
function mobileWidgetStorageKey(portal=state.portal){return `survey-widget-return-${portal}`}
function validMobileWidgetReturn(record,portal=state.portal){return !!record&&record.portal===portal&&MOBILE_WIDGET_MAIN_ROUTES.has(record.route)}
function readMobileWidgetReturn(){if(validMobileWidgetReturn(state.mobileWidgetReturn))return state.mobileWidgetReturn;try{const record=JSON.parse(sessionStorage.getItem(mobileWidgetStorageKey())||'null');if(validMobileWidgetReturn(record)){state.mobileWidgetReturn=record;return record}}catch{}return null}
function widgetEntryTrack(event,sourceRoute,targetRoute,returnResult=''){const record={event,portal_type:state.portal,source_route:sourceRoute,target_route:targetRoute,return_result:returnResult,timestamp:formatSystemTime()};window.__widgetEntryEvents=window.__widgetEntryEvents||[];window.__widgetEntryEvents.push(record)}
function mobileWidgetEntry(){if(state.preview!=='mobile'||!MOBILE_WIDGET_MAIN_ROUTES.has(state.page))return'';return `<button type="button" class="mobile-widget-entry" data-mobile-widget-entry>首页组件</button>`}
function openMobileWidget(){if(!MOBILE_WIDGET_MAIN_ROUTES.has(state.page))return;const record={portal:state.portal,route:state.page,enteredAt:formatSystemTime()};state.mobileWidgetReturn=record;sessionStorage.setItem(mobileWidgetStorageKey(),JSON.stringify(record));widgetEntryTrack('survey_widget_entry_click',state.page,'mobile/widget');location.hash='mobile/widget'}
function returnFromMobileWidget(){const record=readMobileWidgetReturn(),target=record?.route||'mobile/fill',result=record?'restored':'fallback';sessionStorage.removeItem(mobileWidgetStorageKey());state.mobileWidgetReturn=null;widgetEntryTrack('survey_widget_return_click','mobile/widget',target,result);location.hash=target}
function mount(){const root=$('#app'); if(!root)return; state.portal=root.dataset.portal;state.resourceCenterEnabled=root.dataset.resourceCenterEnabled!=='false';state.preview=sessionStorage.getItem('survey-preview')||(innerWidth<=720?'mobile':'pc'); state.questions=defaultQuestions(); window.addEventListener('hashchange',route);document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(state.createSurveyMenuOpen){state.createSurveyMenuOpen=false;renderShell();setTimeout(()=>$('[data-create-survey-menu-toggle]')?.focus(),0);return}closePrd('escape')});document.addEventListener('click',e=>{const button=e.composedPath().find(node=>node?.dataset?.prdEntry==='overlay');if(!button)return;e.preventDefault();e.stopImmediatePropagation();openPrd(button.dataset.prdKey,'overlay')},true);new MutationObserver(()=>{scanOverlayPrd();applyRuntimeConstraints(root)}).observe(root,{childList:true,subtree:true}); route()}
function route(){if($('#prd-layer')?.classList.contains('show'))closePrd('route_change');const previous=state.page;let next=(location.hash||'#list').slice(1).split('?')[0];if(next==='dashboard'){location.replace('#list');return}const folderContext=saveFolderRouteContext(next);if(folderContext&&(state.preview!=='mobile'||!folderContext.allowed||!folderContext.count)){clearAttachmentSelections();const fallback=folderContext.survey?`stats/detail/${folderContext.survey.id}`:'stats';if(next!==fallback){location.replace(`#${fallback}`);return}next=fallback}if(shouldClearAttachmentSelections(previous,next))clearAttachmentSelections();if(next!=='list')state.createSurveyMenuOpen=false;state.page=next;if(state.page==='create'){location.replace('#list/create');return}if(state.portal==='bureau'&&state.preview==='pc'&&state.page==='stats'){location.replace('#all-surveys');return}renderShell()}
function renderShell(){syncAllSurveyTemporalStatuses();const c=CONFIG[state.portal],mobile=state.preview==='mobile',activePage=state.page.startsWith('list/')?'list':state.page.startsWith('all-surveys/')?'all-surveys':state.page.startsWith('templates/')?'templates':state.page.startsWith('stats')?'stats':state.page; document.title=`${c.org} · 教育问卷调研`; $('#app').innerHTML=`<div class="prototype-shell ${mobile?'device-mobile':'device-pc'}"><div class="prototype-switch"><div><button class="${state.portal==='bureau'?'active':''}" data-portal-switch="bureau">教育局端</button><button class="${state.portal==='school'?'active':''}" data-portal-switch="school">学校端</button></div><div><button class="${!mobile?'active':''}" data-device-switch="pc">PC端</button><button class="${mobile?'active':''}" data-device-switch="mobile">移动端</button></div></div><div class="device-stage"><div class="app portal-${state.portal} ${(state.page.startsWith('stats')||state.page.startsWith('mobile/'))?'stats-app':''}"><aside class="sidebar"><div class="side-brand"><span class="brand-mark">调</span><div>教育问卷调研<div class="side-caption">${c.name}</div></div></div><nav class="side-menu">${c.menus.map(m=>`<a class="menu-item ${activePage===m[0]?'active':''}" href="#${m[0]}"><span>${m[1]}</span></a>`).join('')}</nav></aside><main class="main"><header class="topbar"><div><div class="org-title">${c.org}</div><div class="org-sub">教育问卷调研 · ${c.name}</div></div><div class="top-actions"><span class="avatar">${c.user[0]}</span><span>${c.user}</span></div></header><section class="content" id="view">${renderPage()}${mobileWidgetEntry()}</section></main></div></div></div><div class="modal-mask" id="modal"></div><div class="prd-mask" id="prd-layer"></div><div class="toast" id="toast"></div>`;bind();installPagePrdButton();if(mobile&&MOBILE_WIDGET_MAIN_ROUTES.has(state.page))widgetEntryTrack('survey_widget_entry_expose',state.page,'mobile/widget')}
function deviceSwitchPage(target){const templateWorkflow=state.page==='templates/create'||state.page.startsWith('templates/edit/'),pcCreation=state.page==='list/create'||state.page.startsWith('list/edit/'),mobileCreation=['mobile/create','mobile/settings','mobile/recipients'].includes(state.page);if(target==='mobile'){if(state.page==='cloud-widget')return'mobile/widget';if(state.templateSelectOpen||state.page==='list/template-select'||templateWorkflow)return'mobile/templates';if(pcCreation)return state.step>=4?'mobile/settings':state.step===3?'mobile/recipients':'mobile/create';if(state.page.startsWith('mobile/')||state.page.startsWith('stats'))return state.page;return'mobile/fill'}if(state.page==='mobile/widget')return'cloud-widget';if(state.page==='mobile/templates')return'list/template-select';if(state.page.startsWith('stats/save-folder/'))return state.resourceReturnPage||`stats/detail/${state.page.split('/')[2]}`;if(mobileCreation){state.step=state.page==='mobile/settings'?4:state.page==='mobile/recipients'?3:(state.questions.length?2:1);return state.editingSurveyId?`list/edit/${state.editingSurveyId}`:'list/create'}if(state.page.startsWith('stats'))return state.page;return state.page.startsWith('mobile/')?'list':state.page}
function switchDevice(target){
 if(target===state.preview)return;
 const templateWorkflow=state.page==='templates/create'||state.page.startsWith('templates/edit/');
 const nextPage=deviceSwitchPage(target),currentHash=(location.hash||'#list').slice(1);
 state.templateSelectOpen=false;
 if(target==='mobile'&&templateWorkflow)resetCreationState();
 state.preview=target;sessionStorage.setItem('survey-preview',target);
 if(nextPage===state.page||nextPage===currentHash){state.page=nextPage;renderShell()}else location.hash=nextPage;
}
function currentSurveyTypes(){return CONFIG[state.portal]?.surveyTypes||[]}
function surveyTypeById(id){return currentSurveyTypes().find(item=>String(item.id)===String(id))}
function validSurveyTypeId(id){return Boolean(surveyTypeById(id))}
function surveyTypeName(id,fallback='未分类'){return surveyTypeById(id)?.name||fallback}
function surveyTypeLabel(s){return surveyTypeName(s?.surveyTypeId,s?.surveyTypeName||'未分类')}
function surveyTypeOptions(value,includeEmpty=true){const options=currentSurveyTypes().map(item=>`<option value="${item.id}" ${String(item.id)===String(value)?'selected':''}>${esc(item.name)}</option>`).join('');return `${includeEmpty?`<option value="">请选择问卷类型</option>`:''}${options}`}
function surveyTypeSurveyCount(id){return CONFIG[state.portal].surveys.filter(s=>s.deleted!==1&&String(s.surveyTypeId)===String(id)).length}
function surveyTypeTemplateCount(id){return surveyTemplateItems().filter(item=>String(item.surveyTypeId)===String(id)).length}
function normalizeSurveyChannels(){const fallback=currentSurveyTypes()[0],legacyMap=state.portal==='bureau'?{'系统定向':101,'学校调查':102,'公开问卷':104,'内部调查':102}:{'每日收集':202,'公开问卷':204,'系统定向':201,'内部调查':201};CONFIG[state.portal].surveys.forEach((s,i)=>{if(!s.channel)s.channel=i===0&&s.owner===currentUserName()?state.channel:s.type==='公开问卷'?'public':'internal';if(!s.frequency)s.frequency=s.type==='每日收集'?'daily':'single';if(!s.surveyTypeId&&/校园安全/.test(s.title))s.surveyTypeId=state.portal==='bureau'?103:203;if(!s.surveyTypeId&&legacyMap[s.type])s.surveyTypeId=legacyMap[s.type];if(validSurveyTypeId(s.surveyTypeId))s.surveyTypeName=surveyTypeName(s.surveyTypeId);else if(!s.surveyTypeId&&fallback){s.surveyTypeId=fallback.id;s.surveyTypeName=fallback.name}syncDynamicSurveyRecipientTotal(s)})}
function renderPage(){normalizeSurveyChannels();if(state.preview==='mobile'&&!state.page.startsWith('mobile/')&&!state.page.startsWith('stats'))state.page='mobile/fill';if(state.page!=='list'&&state.page!=='list/template-select')state.templateSelectOpen=false;if(state.page==='mobile/widget')return cloudHomeWidget();if(state.page.startsWith('mobile/'))return mobileRoutePage();if(state.page.startsWith('list/edit/'))return editSurveyPage();if(state.page.startsWith('list/response/'))return responseDetailPage();if(state.page.startsWith('list/fill/'))return responseFillPage();if(/^all-surveys\/[^/]+\/responses\/[^/]+$/.test(state.page))return allSurveyResponsePage();if(state.page.startsWith('all-surveys/'))return allSurveyDetailPage();if(state.page.startsWith('stats/'))return statsRoutePage();if(state.page.startsWith('templates/edit/'))return createTemplatePage();switch(state.page){case'cloud-widget':return cloudHomeWidget();case'list':return listPage();case'list/template-select':return surveyTemplateSelectionPage();case'list/create':return createPage();case'all-surveys':return allSurveysPage();case'templates':return templatesPage();case'templates/create':return createTemplatePage();case'stats':return state.portal==='school'&&state.preview==='pc'?allSurveysPage():statsPage();case'survey-types':return surveyTypesPage();case'auth':return authPage();case'approval':return approvalPage();default:return listPage()}}
function pageHead(title,sub,actions=''){return `<div class="page-head"><div><h1>${title}</h1></div><div class="head-actions">${actions}</div></div>`}
const MENU_PAGE_SIZE=10,PAGE_SIZE_OPTIONS=[10,20,50,100];
function paginationStateKey(key){return `${state.portal||'unknown'}:${key}`}
function resetPagination(key){state.pagination[paginationStateKey(key)]=1}
function pageSizeFor(key){if(state.preview!=='pc')return MENU_PAGE_SIZE;const value=Number(state.pageSizes[paginationStateKey(key)]);return PAGE_SIZE_OPTIONS.includes(value)?value:MENU_PAGE_SIZE}
function demoSort(items,rankKey='demoRank'){const rank=item=>Number.isFinite(item?.[rankKey])?item[rankKey]:Number.isFinite(item?.demoRank)?100000+item.demoRank:-1;return [...items].sort((a,b)=>{const aRank=rank(a),bRank=rank(b);if(aRank!==bRank)return aRank-bRank;return String(b?.createdAt||'').localeCompare(String(a?.createdAt||''))||Number(b?.id||0)-Number(a?.id||0)})}
function paginateItems(key,items,pageSize=pageSizeFor(key)){if(state.preview==='mobile')return{items:[...items],total:items.length,totalPages:1,page:1,start:0,pageSize:items.length||MENU_PAGE_SIZE};const stateKey=paginationStateKey(key),size=PAGE_SIZE_OPTIONS.includes(Number(pageSize))?Number(pageSize):MENU_PAGE_SIZE,total=items.length,totalPages=Math.max(1,Math.ceil(total/size)),requested=Math.max(1,Number(state.pagination[stateKey]||1)),page=Math.min(requested,totalPages),start=(page-1)*size;state.pagination[stateKey]=page;return{items:items.slice(start,start+size),total,totalPages,page,start,pageSize:size}}
function paginationComponent(key,pages=1,current=1,total=0){if(state.preview==='mobile')return'';const size=pageSizeFor(key),sizeControl=`<label class="pagination-size">每页<select data-page-size aria-label="每页展示条数">${PAGE_SIZE_OPTIONS.map(value=>`<option value="${value}" ${size===value?'selected':''}>${value}</option>`).join('')}</select>条</label>`;return `<div class="pagination" data-pagination="${key}" data-total="${total}">${sizeControl}<button class="page-btn" data-page-action="prev" aria-label="上一页" ${current<=1?'disabled':''}>‹</button>${Array.from({length:pages},(_,i)=>`<button class="page-btn ${current===i+1?'active':''}" data-page="${i+1}" aria-current="${current===i+1?'page':'false'}">${i+1}</button>`).join('')}<button class="page-btn" data-page-action="next" aria-label="下一页" ${current>=pages?'disabled':''}>›</button></div>`}
function sentCount(s){return s.channel==='internal'?s.total:'—'}
function surveySubmissionSplit(s,snapshot=null){const source=snapshot||s||{},hasInternal=source.internalDone!==undefined&&source.internalDone!==null,hasExternal=source.externalDone!==undefined&&source.externalDone!==null,aggregateValue=source.done??source.submitted,hasAggregate=aggregateValue!==undefined&&aggregateValue!==null&&Number.isFinite(Number(aggregateValue)),aggregate=hasAggregate?Math.max(0,Number(aggregateValue)):0;let internalDone=hasInternal?Math.max(0,Number(source.internalDone)||0):null,externalDone=hasExternal?Math.max(0,Number(source.externalDone)||0):null;if(internalDone!==null&&externalDone!==null)return{internalDone,externalDone};if(internalDone!==null)return{internalDone,externalDone:hasAggregate?Math.max(0,aggregate-internalDone):0};if(externalDone!==null)return{internalDone:hasAggregate?Math.max(0,aggregate-externalDone):0,externalDone};const externalOnly=Number(s?.total||0)<=0&&(s?.allowExternal===true||s?.channel!=='internal');return externalOnly?{internalDone:0,externalDone:aggregate}:{internalDone:aggregate,externalDone:0}}
function internalSubmittedCount(s,snapshot=null){return surveySubmissionSplit(s,snapshot).internalDone}
function externalSubmittedCount(s,snapshot=null){return surveySubmissionSplit(s,snapshot).externalDone}
function submittedCount(s,snapshot=null){return internalSubmittedCount(s,snapshot)+externalSubmittedCount(s,snapshot)}
function widgetSurveys(){syncAllSurveyTemporalStatuses();return CONFIG[state.portal].surveys.filter(s=>s.deleted!==1&&s.status!=='draft').sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||''))||Number(b.id||0)-Number(a.id||0)).slice(0,5)}
function widgetDeadline(s){if(s.deadline)return s.deadline;if(s.endDate)return s.endDate;if(!s.time||s.time==='未发布')return '—';if(s.time.includes(' 至 '))return s.time.split(' 至 ').pop();if(s.time.startsWith('每日 '))return '每日 '+s.time.slice(3).split('-').pop();return s.time}
function surveyCreatedAtValue(value){const parts=String(value||'').match(/\d+/g)?.map(Number)||[];if(parts.length<3)return-1;const stamp=Date.UTC(parts[0],parts[1]-1,parts[2],parts[3]||0,parts[4]||0,parts[5]||0);return Number.isFinite(stamp)?stamp:-1}
function mobileWidgetSurveys(){return mobileReceived().sort((a,b)=>surveyCreatedAtValue(b.createdAt)-surveyCreatedAtValue(a.createdAt)||Number(b.id||0)-Number(a.id||0)).slice(0,1)}
function mobileWidgetSurveyHref(s){return `#mobile/fill/${s.id}/${fillStatusKey(s)==='submitted'?'view':'edit'}`}
function widgetDateWithYear(value,fallbackYear=''){const match=String(value||'').trim().match(/(?:(\d{4})-)?(\d{1,2})-(\d{1,2})(?!\d)/);if(!match)return'';const month=+match[2],day=+match[3];if(month<1||month>12||day<1||day>31)return'';const year=match[1]||(/^\d{4}$/.test(String(fallbackYear))?String(fallbackYear):beijingDateKey().slice(0,4));return `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`}
function mobileWidgetDeadline(s){const year=String(s.createdAt||'').match(/^(\d{4})/)?.[1]||beijingDateKey().slice(0,4),legacyEnd=s.time?.includes(' 至 ')?s.time.split(' 至 ').pop():'';return widgetDateWithYear(s.endDate,year)||widgetDateWithYear(s.deadline,year)||widgetDateWithYear(legacyEnd,year)||'—'}
function cloudHomeWidget(){const c=CONFIG[state.portal],rows=state.preview==='mobile'?mobileWidgetSurveys():widgetSurveys(),metrics=[['问卷总数',c.stats[0][1]],['进行中问卷',c.stats[1][1]]],detail=s=>`#stats/detail/${s.id}`,mobileDetail=s=>mobileWidgetSurveyHref(s),key=state.preview==='mobile'?'mobile-widget':'cloud-widget',badge=s=>`<em class="tag ${s.status}">${esc(s.statusText)}</em>`;if(state.preview==='mobile')return `<div class="cloud-mobile-home"><button type="button" class="cloud-mobile-return" data-mobile-widget-return>← 返回主应用</button><header><span>云平台首页 · ${c.name}</span><b>${c.org}</b></header><section class="cloud-mobile-section"><div class="cloud-mobile-title"><div><h2>问卷调研</h2><p>问卷运行统计</p></div>${prdButton(key,'page','cloud-widget-prd-trigger')}</div><div class="cloud-mobile-widget cloud-stats-only" aria-label="问卷调研统计数据"><div class="cloud-stat-grid">${metrics.map(m=>`<div><b>${m[1]}</b><span>${m[0]}</span></div>`).join('')}</div><div class="cloud-mobile-latest"><h3 class="cloud-latest-title">最新问卷</h3>${rows.length?rows.map(s=>`<a class="cloud-mobile-latest-row" data-fill-status="${fillStatusKey(s)}" href="${mobileDetail(s)}"><b>${esc(s.title)}${badge(s)}</b><span>截止时间：${esc(mobileWidgetDeadline(s))}</span></a>`).join(''):'<div class="cloud-widget-empty">暂无问卷</div>'}</div></div></section><section class="cloud-mobile-placeholder"><h2>常用应用</h2><div></div></section></div>`;return `<div class="cloud-pc-home"><div class="cloud-pc-caption"><span>云平台首页 · 半宽组件预览</span><b>${c.org}</b></div><div class="cloud-half-grid"><section class="cloud-widget-card"><header><h2>问卷调研</h2><div class="cloud-widget-head-actions">${prdButton(key,'page','cloud-widget-prd-trigger')}<a href="#all-surveys">查看更多 &gt;</a></div></header><div class="cloud-widget-metrics horizontal">${metrics.map(m=>`<a href="#all-surveys"><small>${m[0]}</small><b>${m[1]}</b></a>`).join('')}</div><div class="cloud-widget-list compact"><h3 class="cloud-latest-title">最新问卷</h3><div class="cloud-widget-list-head"><span>问卷名称</span><span>提交进度</span><span>完成率</span><span>截止时间</span></div>${rows.length?rows.map(s=>{const rate=s.total?Math.round(s.done/s.total*100):null;return `<a class="cloud-widget-row" href="${detail(s)}"><span title="${esc(s.title)}｜${esc(s.target)}"><i></i>${esc(s.title)}${badge(s)}</span><span>${rate===null?`累计 ${s.done} 份`:`${s.done}/${s.total}`}</span><span>${rate===null?'<em>公开收集</em>':`<div class="cloud-widget-progress"><i style="width:${rate}%"></i></div><b>${rate}%</b>`}</span><span>${esc(widgetDeadline(s))}</span></a>`}).join(''):`<div class="cloud-widget-empty">暂无问卷</div>`}</div></section><div class="cloud-half-placeholder"><b>其他首页组件</b><span>等宽组件占位</span></div></div></div>`}
function fillStatusKey(s){return s?.fillStatus==='submitted'?'submitted':'not_started'}
function fillStatusLabel(s){return fillStatusKey(s)==='submitted'?'已填写':'未填写'}
function surveyTable(rows,compact=false,view='published',start=0){const showFill=!compact&&view==='received',columns=compact?6:showFill?10:9;return `<div class="${compact?'compact-list':'table-wrap'}"><table class="data-table"><thead><tr><th class="index-col">序号</th><th>问卷名称</th><th>问卷类型</th><th>发送人数</th><th>提交人数</th><th>状态</th>${showFill?'<th>填写状态</th>':''}${compact?'':'<th>创建人</th><th>创建时间</th><th>操作</th>'}</tr></thead><tbody>${rows.length?rows.map((s,i)=>`<tr data-id="${s.id}" data-title="${esc(s.title)}" data-owner="${esc(s.owner)}" data-type="${esc(s.surveyTypeId)}" data-status="${s.status}"><td class="index-col">${start+i+1}</td><td><div class="title-cell">${esc(s.title)}</div>${compact?`<div class="meta-line">${esc(s.time)}</div>`:''}</td><td>${esc(surveyTypeLabel(s))}</td><td>${sentCount(s)}</td><td>${submittedCount(s)}</td><td><span class="tag ${s.status}">${s.statusText}</span></td>${showFill?`<td><span class="tag fill-${fillStatusKey(s)}">${fillStatusLabel(s)}</span></td>`:''}${compact?'':`<td>${esc(s.owner)}</td><td class="nowrap">${s.createdAt}</td><td><div class="row-actions">${view==='received'?receivedActions(s):publishedActions(s)}</div></td>`}</tr>`).join(''):`<tr><td colspan="${columns}"><div class="empty-state"><b>未找到符合条件的问卷</b><span>请调整筛选条件后重试</span></div></td></tr>`}</tbody></table></div>`}
function canDeleteSurvey(s){return Boolean(s&&s.deleted!==1&&s.owner===currentUserName()&&['draft','paused'].includes(s.status))}
function publishedActions(s){
 if(s.status==='draft')return '<button class="link-btn" data-action="edit-draft">编辑</button><button class="link-btn danger" data-action="delete-survey">删除</button>';
 const qrAction=s.allowExternal===true||s.channel!=='internal'?`<button class="link-btn" data-survey-qr="${s.id}">二维码</button>`:'';
 if(s.status==='not_started')return `<a class="link-btn" href="#all-surveys/${s.id}" data-survey-detail-source="list">查看</a><button class="link-btn" data-action="edit-survey">编辑</button><button class="link-btn" data-action="view-stats">问卷统计</button>${qrAction}<button class="link-btn danger" data-action="end">结束</button>`;
 const statusActions=s.status==='running'?'<button class="link-btn" data-action="pause">暂停</button><button class="link-btn danger" data-action="end">结束</button>':s.status==='paused'?'<button class="link-btn" data-action="resume">恢复</button><button class="link-btn danger" data-action="end">结束</button>':'';
 const deleteAction=s.status==='paused'?'<button class="link-btn danger" data-action="delete-survey">删除</button>':'';
 const statsAction=hasStatsTask(s)?'<button class="link-btn" data-action="view-stats">问卷统计</button>':'<button class="link-btn" type="button" disabled title="暂无可统计任务日期">问卷统计</button>';
 return `${statsAction}${qrAction}${statusActions}${deleteAction}`
}
function responseRecords(s){return [...(MY_RESPONSES[state.portal]?.[s.id]||[])].filter(r=>r.valid!==false).sort((a,b)=>b.submittedAt.localeCompare(a.submittedAt))}
function localDateKey(value=new Date()){const d=value instanceof Date?value:new Date(value);const pad=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`}
const SURVEY_STATUS_TEXT={draft:'草稿',not_started:'未开始',running:'进行中',paused:'已暂停',ended:'已结束'};
function temporalStatusForDates(startDate,endDate,today=beijingDateKey()){if(endDate&&today>endDate)return'ended';if(startDate&&today<startDate)return'not_started';return'running'}
function syncSurveyTemporalStatus(s,today=beijingDateKey()){if(!s||!s.startDate||!s.endDate||s.status==='draft'||s.status==='ended')return s?.status;if(today>s.endDate){s.status='ended';s.statusText=SURVEY_STATUS_TEXT.ended;return s.status}if(s.status==='paused')return s.status;s.status=temporalStatusForDates(s.startDate,s.endDate,today);s.statusText=SURVEY_STATUS_TEXT[s.status];return s.status}
function syncAllSurveyTemporalStatuses(){Object.values(CONFIG).forEach(portal=>portal.surveys.forEach(s=>syncSurveyTemporalStatus(s)))}
function dateKeyOffset(days){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+days);return localDateKey(d)}
function isDailySurvey(s){return s.frequency==='daily'||s.type==='每日收集'}
function generatedDailyStats(s){if(!isDailySurvey(s))return null;if(s.dailyStats)return s.dailyStats;const base=internalSubmittedCount(s),dates=[dateKeyOffset(-3),dateKeyOffset(-2),dateKeyOffset(-1)],values=[Math.max(0,base-47),Math.max(0,base-21),base],inRange=date=>(!s.startDate||date>=s.startDate)&&(!s.endDate||date<=s.endDate);s.dailyStats={};dates.forEach((date,index)=>{const day=new Date(`${date}T12:00:00`).getDay();if(!inRange(date)||(s.skipNonWorkday&&(day===0||day===6)))return;s.dailyStats[date]={internalDone:values[index],externalDone:s.allowExternal?Math.max(0,externalSubmittedCount(s)-2+index):0}});return s.dailyStats}
function availableStatsDates(s){const yesterday=dateKeyOffset(-1),daily=generatedDailyStats(s);return daily?Object.keys(daily).filter(date=>date<=yesterday).sort((a,b)=>b.localeCompare(a)):[]}
function selectedStatsDate(s){if(!isDailySurvey(s))return'';const dates=availableStatsDates(s),saved=state.statsDateBySurvey[s.id],yesterday=dateKeyOffset(-1),selected=dates.includes(saved)?saved:dates.includes(yesterday)?yesterday:dates[0]||'';state.statsDateBySurvey[s.id]=selected;return selected}
function statsSnapshot(s){const date=selectedStatsDate(s),daily=isDailySurvey(s),snapshot=daily?(generatedDailyStats(s)?.[date]||null):s,total=Math.max(0,Number(s.total||0));if(daily&&!snapshot)return{date,hasData:false,total,internalDone:0,externalDone:0,submitted:0,pending:total?total:null,rate:null,hasExternal:Boolean(s.allowExternal||s.externalDone)};const internalDone=internalSubmittedCount(s,snapshot),externalDone=externalSubmittedCount(s,snapshot),submitted=internalDone+externalDone,pending=total?Math.max(0,total-internalDone):null,internalTotal=internalDone+(pending??0),rate=internalTotal?Math.round(internalDone/internalTotal*100):null;return{date,hasData:true,total,internalDone,externalDone,submitted,pending,rate,hasExternal:Boolean(s.allowExternal||externalDone>0||s.externalDone>0)} }
function infoTip(text,label){return `<span class="stats-info-tip" role="button" tabindex="0" aria-label="${esc(label)}：${esc(text)}" data-stats-tip data-tip="${esc(text)}">i</span>`}
function statsDateControl(s){if(!isDailySurvey(s))return'';const dates=availableStatsDates(s),selected=selectedStatsDate(s);return dates.length?`<label class="stats-date-control"><span>统计日期</span><select data-stats-date="${s.id}">${dates.map(date=>`<option value="${date}" ${date===selected?'selected':''}>${date}</option>`).join('')}</select></label>`:'<div class="stats-date-empty">暂无可统计的任务日期</div>'}
function canCreateResponse(s){syncSurveyTemporalStatus(s);if(s.status!=='running')return false;const records=responseRecords(s);if(!records.length)return true;if(s.frequency==='daily')return !records.some(r=>r.submittedAt.slice(0,10)===beijingDateKey());return false}
function receivedActions(s){const records=responseRecords(s),view=records.length?`<a class="link-btn" href="#list/response/${s.id}">查看</a>`:'';if(!canCreateResponse(s))return view;return `${view}<a class="link-btn" href="#list/fill/${s.id}">提交问卷</a>`}
function currentUserName(){return CONFIG[state.portal].user.split(' · ')[0]}
const RECEIVED_VISIBLE_STATUSES=new Set(['not_started','running','paused','ended']);
function isReceivedSurveyVisible(s){if(!s||s.received!==true||s.deleted===1)return false;syncSurveyTemporalStatus(s);return RECEIVED_VISIBLE_STATUSES.has(s.status)}
function listStatusOptions(){return state.listView==='received'?[['','全部'],['not_started','未开始'],['running','进行中'],['paused','已暂停'],['ended','已结束']]:[['','全部'],['draft','草稿'],['not_started','未开始'],['running','进行中'],['paused','已暂停'],['ended','已结束']]}
function listRows(){const f=state.listFilters,surveys=CONFIG[state.portal].surveys,scope=state.listView==='received'?surveys.filter(isReceivedSurveyVisible):surveys.filter(s=>s.deleted!==1&&s.owner===currentUserName());return demoSort(scope.filter(s=>String(s.title||'').includes(f.title.trim())&&String(s.owner||'').includes(f.owner.trim())&&(!f.type||String(s.surveyTypeId)===String(f.type))&&(!f.status||s.status===f.status)))}
function createSurveyMenu(){return `<div class="create-survey-menu"><button type="button" class="btn primary" data-create-survey-menu-toggle aria-haspopup="menu" aria-expanded="${state.createSurveyMenuOpen}">+ 新增问卷</button>${state.createSurveyMenuOpen?`<div class="create-survey-menu-popover" role="menu" aria-label="选择问卷创建方式"><button type="button" role="menuitem" data-create-survey-custom><b>自定义创建</b></button><button type="button" role="menuitem" data-create-survey-template><b>从模板创建</b></button></div>`:''}</div>${state.templateSelectOpen?templateSelectionModalMarkup():''}`}
function listPage(){const f=state.listFilters,statusOptions=listStatusOptions();if(f.status&&!statusOptions.some(option=>option[0]===f.status))f.status='';const rows=listRows(),key=`survey-list:${state.listView}`,page=paginateItems(key,rows),typeOptions=[['','全部'],...currentSurveyTypes().map(item=>[String(item.id),item.name])];return `${pageHead('我的问卷','管理本人收到和发布的问卷、接收人员与发布进度。',createSurveyMenu())}<div class="tabs">${[['received','我收到的'],['published','我发布的']].map(t=>`<button class="tab ${state.listView===t[0]?'active':''}" data-list-view="${t[0]}">${t[1]}</button>`).join('')}</div><div class="filter-card"><div class="toolbar filter-toolbar"><label class="filter-item"><span>问卷名称：</span><input id="filter-title" type="text" maxlength="50" value="${esc(f.title)}" placeholder="请输入问卷名称"></label><label class="filter-item"><span>创建人：</span><input id="filter-owner" type="text" maxlength="50" value="${esc(f.owner)}" placeholder="请输入创建人"></label><label class="filter-item"><span>问卷类型：</span><select id="filter-type" class="select">${filterOptions(typeOptions,f.type)}</select></label><label class="filter-item"><span>问卷状态：</span><select id="filter-status" class="select">${filterOptions(statusOptions,f.status)}</select></label></div><span class="subtle" id="filter-count">共 ${page.total} 条记录</span></div><div id="survey-table">${surveyTable(page.items,false,state.listView,page.start)}${paginationComponent(key,page.totalPages,page.page,page.total)}</div>`}
function receivedSurveyFromRoute(index=2){const id=+state.page.split('/')[index];return CONFIG[state.portal].surveys.find(s=>s.id===id&&isReceivedSurveyVisible(s))}
function frequencyText(value){return ({single:'仅提交一次',daily:'每日收集一次'})[value]||'仅提交一次'}
function responseTimestamp(){const d=new Date(),pad=n=>String(n).padStart(2,'0');return `${localDateKey(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`}
function responseNotFound(){return `${pageHead('本人答卷','')}<a class="back-link" href="#list">← 返回我的问卷</a><div class="empty-state detail-empty"><b>未找到可查看的本人答卷</b><span>该问卷不存在、已移除或您不在接收范围内。</span></div>`}
function responseDetailPage(){const s=receivedSurveyFromRoute(),records=s?currentPersonResponseRecords(s):[];if(!s||!records.length)return responseNotFound();const selectedId=state.responseSelection[s.id],selected=records.find(r=>r.id===selectedId)||records[0];state.responseSelection[s.id]=selected.id;return `<a class="back-link" href="#list">← 返回我的问卷</a>${pageHead('本人答卷','')}<div class="response-detail-head"><div><h2>${esc(s.title)}</h2><p>${frequencyText(s.frequency)} · 共 ${records.length} 次提交</p></div><span class="tag ${s.status}">${s.statusText}</span></div><div class="my-response-layout"><aside class="response-history card"><div class="card-title">提交历史</div>${records.map((r,i)=>`<button class="response-history-item ${r.id===selected.id?'active':''}" data-action="select-my-response" data-survey-id="${s.id}" data-response-id="${r.id}"><b>第 ${records.length-i} 次提交</b><span>${r.submittedAt}</span><small>${r.id}</small></button>`).join('')}</aside><section class="response-answer card"><div class="response-answer-head"><div><h3>答卷内容</h3><p>提交时间：${selected.submittedAt}</p></div><span class="response-readonly-tag">已提交，仅支持查看</span></div><div class="answer-list">${selected.answers.map((a,i)=>`<div class="answer-item"><span>${String(i+1).padStart(2,'0')}</span><div><b>${esc(a[0])}</b><p>${esc(readableAnswerValue(a[1]))}</p></div></div>`).join('')}</div></section></div>`}
function answerAt(answers,index){if(Array.isArray(answers))return answers[index]?.[1]??'';return''}
const LOCATION_DIVISIONS=[
 {name:'北京市',cities:[{name:'市辖区',districts:['东城区','西城区','朝阳区','丰台区','石景山区','海淀区','门头沟区','房山区','通州区','顺义区','昌平区','大兴区','怀柔区']}]},
 {name:'上海市',cities:[{name:'市辖区',districts:['黄浦区','徐汇区','长宁区','静安区','普陀区','虹口区','杨浦区','闵行区','宝山区','嘉定区','浦东新区','松江区']}]},
 {name:'浙江省',cities:[{name:'杭州市',districts:['上城区','拱墅区','西湖区','滨江区','萧山区','余杭区','临平区','钱塘区','临安区','临江县']},{name:'宁波市',districts:['海曙区','江北区','北仑区','镇海区','鄞州区','奉化区']},{name:'温州市',districts:['鹿城区','龙湾区','瓯海区','洞头区']}]},
 {name:'江苏省',cities:[{name:'南京市',districts:['玄武区','秦淮区','建邺区','鼓楼区','浦口区','栖霞区','雨花台区']},{name:'苏州市',districts:['姑苏区','虎丘区','吴中区','相城区','吴江区']}]},
 {name:'广东省',cities:[{name:'广州市',districts:['越秀区','海珠区','荔湾区','天河区','白云区','黄埔区','番禺区']},{name:'深圳市',districts:['福田区','罗湖区','南山区','盐田区','宝安区','龙岗区','龙华区']}]},
 {name:'四川省',cities:[{name:'成都市',districts:['锦江区','青羊区','金牛区','武侯区','成华区','龙泉驿区','双流区','郫都区']},{name:'绵阳市',districts:['涪城区','游仙区','安州区']}]}
];
function locationAreaParts(value=''){const area=readableAnswerValue(value).split('｜')[0]||'';return area.split('-').map(item=>item.trim()).filter(Boolean).slice(0,3)}
function locationProvince(name){return LOCATION_DIVISIONS.find(item=>item.name===name)}
function locationCity(provinceName,cityName){return locationProvince(provinceName)?.cities.find(item=>item.name===cityName)}
function locationDesktopInput(q,index,area,detail){const complete=locationAreaParts(area).length===3?locationAreaParts(area).join('-'):'';return `<div class="location-answer location-pc-control"><input type="hidden" data-survey-answer="${index}" value="${esc(complete)}"><button type="button" class="pc-location-trigger ${complete?'selected':''}" data-location-picker-open="${index}" data-location-picker-mode="pc"><span>${esc(complete||'请选择省市区')}</span><i aria-hidden="true">›</i></button>${q.detailedAddress?`<input class="location-detail-input" data-location-detail="${index}" value="${esc(detail)}" maxlength="100" placeholder="请输入详细地址">`:''}</div>`}
function locationMobileInput(q,index,area,detail){const complete=locationAreaParts(area).length===3?locationAreaParts(area).join('-'):'';return `<div class="location-answer location-mobile-control"><input type="hidden" data-survey-answer="${index}" value="${esc(complete)}"><button type="button" class="mobile-location-trigger ${complete?'selected':''}" data-location-picker-open="${index}" data-location-picker-mode="mobile"><span>${esc(complete||'请选择省市区')}</span><i aria-hidden="true">›</i></button>${q.detailedAddress?`<input class="location-detail-input" data-location-detail="${index}" value="${esc(detail)}" maxlength="100" placeholder="请输入详细地址">`:''}</div>`}
function openMobileLocationPicker(index,mode='mobile'){const input=$(`[data-survey-answer="${index}"]`);if(!input)return;const desktop=mode==='pc',current=locationAreaParts(input.value),draft={province:current[0]||'',city:current[1]||'',district:current[2]||''},host=$('.device-stage')||document.body,layer=document.createElement('div');let level=draft.province?(draft.city?'district':'city'):'province';layer.className=`location-picker-mask ${desktop?'pc-location-picker-mask':'mobile-location-picker-mask'}`;host.appendChild(layer);const close=()=>{document.removeEventListener('keydown',onKey,true);layer.remove()},onKey=event=>{if(event.key==='Escape'){event.preventDefault();close()}},render=()=>{const levels=[['province',draft.province||'请选择省'],['city',draft.city||'请选择市'],['district',draft.district||'请选择区县']],items=level==='province'?LOCATION_DIVISIONS.map(item=>item.name):level==='city'?(locationProvince(draft.province)?.cities.map(item=>item.name)||[]):(locationCity(draft.province,draft.city)?.districts||[]),selected=draft[level];layer.innerHTML=`<section class="mobile-location-sheet ${desktop?'pc-location-sheet':''}" role="dialog" aria-modal="true" aria-labelledby="location-picker-title"><header><h2 id="location-picker-title">请选择</h2><button type="button" data-location-picker-close aria-label="关闭">×</button></header><nav class="mobile-location-tabs" aria-label="省市区选择步骤">${levels.map(([key,label],position)=>`<button type="button" class="${level===key?'active':''}" data-location-level="${key}" ${(position===1&&!draft.province)||(position===2&&!draft.city)?'disabled':''}>${esc(label)}</button>`).join('')}</nav><div class="mobile-location-list">${items.map(item=>`<button type="button" class="${item===selected?'selected':''}" data-location-option="${esc(item)}"><span>${esc(item)}</span><i aria-hidden="true">${item===selected?'✓':''}</i></button>`).join('')}</div></section>`;layer.querySelector('[data-location-picker-close]').onclick=close;layer.querySelectorAll('[data-location-level]').forEach(button=>button.onclick=()=>{if(button.disabled)return;level=button.dataset.locationLevel;render()});layer.querySelectorAll('[data-location-option]').forEach(button=>button.onclick=()=>{const value=button.dataset.locationOption;if(level==='province'){draft.province=value;draft.city='';draft.district='';level='city';render();return}if(level==='city'){draft.city=value;draft.district='';level='district';render();return}draft.district=value;input.value=[draft.province,draft.city,draft.district].join('-');const trigger=input.closest('.location-answer')?.querySelector('[data-location-picker-open]');if(trigger){trigger.classList.add('selected');trigger.querySelector('span').textContent=input.value}close()})};layer.onclick=event=>{if(event.target===layer)close()};document.addEventListener('keydown',onKey,true);render()}
function answerInput(q,index,value='',readonly=false,mobile=false){
  const kind=questionKind(q.type),name=`answer-${index}`,displayValue=readableAnswerValue(value),values=Array.isArray(value)?value:String(value||'').split('、').filter(Boolean);
  if(readonly)return `<p class="readonly-answer">${esc(displayValue||'—')}</p>`;
  if(kind==='text')return `<textarea data-survey-answer="${index}" maxlength="500" placeholder="请输入">${esc(displayValue)}</textarea>`;
  if(kind==='single')return `<div class="survey-choice-input">${q.options.map(option=>`<label><input type="radio" name="${name}" value="${esc(option)}" ${displayValue===option?'checked':''}> ${esc(option)}</label>`).join('')}</div>`;
  if(kind==='multiple')return `<div class="survey-choice-input">${q.options.map(option=>`<label><input type="checkbox" name="${name}" value="${esc(option)}" ${values.includes(option)?'checked':''}> ${esc(option)}</label>`).join('')}</div>`;
  if(kind==='date')return `<input data-survey-answer="${index}" type="${q.includeTime?'datetime-local':'date'}" value="${esc(displayValue)}">`;
  if(kind==='file')return `<input data-survey-answer="${index}" data-existing-answer="${esc(displayValue)}" type="file" ${q.imageOnly?'accept="image/*"':''}><small>${displayValue?`当前文件：${esc(displayValue)} · `:''}${q.imageOnly?'仅支持图片格式':'支持文件或图片'}</small>`;
  if(kind==='signature')return `<div class="prototype-answer-action"><input data-survey-answer="${index}" value="${esc(displayValue)}" readonly placeholder="尚未签名"><button type="button" data-prototype-sign="${index}">点击签名</button></div>`;
  const [area='',detail='']=displayValue.split('｜');return mobile?locationMobileInput(q,index,area,detail):locationDesktopInput(q,index,area,detail);
}
function surveyAnswerFields(s,answers=[],readonly=false,mobile=false){return surveyQuestions(s).map((q,index)=>`<div class="survey-answer-field ${q.required?'required':''}"><h3><b>${String(index+1).padStart(2,'0')}.</b> ${esc(q.title)}${q.required?'<em>*</em>':''}</h3>${answerInput(q,index,answerAt(answers,index),readonly,mobile)}</div>`).join('')}
function collectSurveyAnswers(s){return surveyQuestions(s).map((q,index)=>{const kind=questionKind(q.type);let value='';if(kind==='single')value=$(`input[name="answer-${index}"]:checked`)?.value||'';else if(kind==='multiple')value=$$(`input[name="answer-${index}"]:checked`).map(input=>input.value);else if(kind==='file'){const input=$(`[data-survey-answer="${index}"]`);value=Array.from(input?.files||[]).map(file=>file.name).join('、')||input?.dataset.existingAnswer||''}else if(kind==='location'){const area=$(`[data-survey-answer="${index}"]`)?.value.trim()||'',detail=$(`[data-location-detail="${index}"]`)?.value.trim()||'';value=[area,detail].filter(Boolean).join('｜')}else value=$(`[data-survey-answer="${index}"]`)?.value.trim()||'';return[q.title,value]})}
function responseAnswerError(s,answers){const questions=surveyQuestions(s);for(let i=0;i<questions.length;i++){const value=answers[i]?.[1],empty=Array.isArray(value)?value.length===0:!String(value??'').trim();if(questions[i].required&&empty)return`请完成第 ${i+1} 题必填内容`}return''}
function responseFillPage(){const parts=state.page.split('/'),s=receivedSurveyFromRoute(),editingId=parts[3];if(!s)return responseNotFound();syncSurveyTemporalStatus(s);if(editingId)return responseDetailPage();if(!canCreateResponse(s))return `${pageHead('填写问卷','')}<a class="back-link" href="#list">← 返回我的问卷</a><div class="empty-state detail-empty"><b>当前不可新增提交</b><span>${s.status==='not_started'?'问卷尚未到开始日期。':s.status==='running'&&!surveyAllowsCurrentPerson(s)?'您当前已不在问卷接收范围内。':s.status==='running'?`${frequencyText(s.frequency)}的提交次数已用完，已提交答卷不支持修改。`:'问卷已暂停或结束。'}</span></div>`;return `<a class="back-link" href="#list">← 返回我的问卷</a>${pageHead('提交问卷','')}<div class="response-form-card card"><div class="response-form-head"><h2>${esc(s.title)}</h2><p>${frequencyText(s.frequency)}，本次提交将生成一条新的答卷记录；提交后不支持修改。</p></div><div class="response-form dynamic-response-form">${surveyAnswerFields(s,[])}</div><div class="footer-actions"><a class="btn" href="#list">取消</a><button class="btn primary" data-action="submit-my-response" data-survey-id="${s.id}">确认提交</button></div></div>`}
function allSurveyRows(){const f=state.allSurveyFilters,invalid=f.start&&f.end&&f.start>f.end;if(invalid)return{rows:[],invalid:true};const rows=CONFIG[state.portal].surveys.filter(s=>s.deleted!==1&&s.status!=='draft'&&String(s.title||'').includes(f.title.trim())&&String(s.owner||'').includes(f.owner.trim())&&(!f.start||String(s.createdAt).slice(0,10)>=f.start)&&(!f.end||String(s.createdAt).slice(0,10)<=f.end)&&(!f.status||s.status===f.status));return{rows:demoSort(rows,'allRank'),invalid:false}}
function allSurveysTable(rows,start=0){return `<div class="table-wrap"><table class="data-table all-surveys-table"><thead><tr><th class="index-col">序号</th><th>问卷名称</th><th>问卷类型</th><th>发送人数</th><th>提交人数</th><th>问卷状态</th><th>创建人员</th><th>创建时间</th><th>操作</th></tr></thead><tbody>${rows.length?rows.map((s,i)=>`<tr data-id="${s.id}" data-title="${esc(s.title)}" data-owner="${esc(s.owner)}" data-created-date="${s.createdAt.slice(0,10)}" data-status="${s.status}"><td class="index-col">${start+i+1}</td><td><div class="title-cell">${esc(s.title)}</div></td><td>${esc(surveyTypeLabel(s))}</td><td>${sentCount(s)}</td><td>${submittedCount(s)}</td><td><span class="tag ${s.status}">${s.statusText}</span></td><td>${esc(s.owner)}</td><td class="nowrap">${s.createdAt}</td><td><div class="row-actions"><a class="link-btn" href="#all-surveys/${s.id}" data-survey-detail-source="all-surveys">查看详情</a>${s.status==='draft'?'':(s.status==='not_started'||hasStatsTask(s))?`<a class="link-btn" href="#stats/detail/${s.id}" data-stats-source="all-surveys">问卷统计</a>`:'<span class="link-btn disabled" aria-disabled="true" title="暂无可统计任务日期">问卷统计</span>'}</div></td></tr>`).join(''):`<tr><td colspan="9"><div class="empty-state"><b>未找到符合条件的问卷</b><span>请调整筛选条件后重试</span></div></td></tr>`}</tbody></table></div>`}
function allSurveysPage(){const f=state.allSurveyFilters,validStatuses=['','not_started','running','paused','ended'];if(!validStatuses.includes(f.status))f.status='';const result=allSurveyRows(),page=paginateItems('all-surveys',result.rows),scope=state.portal==='bureau'?'当前教育局':'当前学校';return `${pageHead('问卷管理',`查看${scope}内所有人员创建的已发布问卷，草稿及已删除问卷不展示。`)}<div class="filter-card all-survey-filter"><div class="toolbar filter-toolbar"><label class="filter-item"><span>问卷名称：</span><input id="all-filter-title" type="text" maxlength="50" value="${esc(f.title)}" placeholder="请输入问卷名称"></label><label class="filter-item"><span>创建人员：</span><input id="all-filter-owner" type="text" maxlength="50" value="${esc(f.owner)}" placeholder="请输入创建人员"></label><label class="filter-item"><span>创建时间：</span><div class="date-range"><input id="all-filter-start" type="date" value="${f.start}"><em>至</em><input id="all-filter-end" type="date" value="${f.end}"></div></label><label class="filter-item"><span>问卷状态：</span><select id="all-filter-status" class="select">${filterOptions([['','全部'],['not_started','未开始'],['running','进行中'],['paused','已暂停'],['ended','已结束']],f.status)}</select></label></div><div class="filter-footer"><span class="subtle" id="all-filter-count">共 ${page.total} 条记录</span><span class="filter-error" id="all-filter-error">${result.invalid?'开始时间不能晚于结束时间':''}</span></div></div><div id="all-surveys-table">${allSurveysTable(page.items,page.start)}${paginationComponent('all-surveys',page.totalPages,page.page,page.total)}</div>`}
function surveyDetailQuestions(s){return surveyQuestions(s).map((question,i)=>`<div class="readonly-question"><span>${String(i+1).padStart(2,'0')}</span><div><b>${esc(question.title)}</b><p>${questionTypeLabel(question.type)} · ${question.required?'必答':'选答'}</p></div></div>`).join('')}
const SURVEY_SCOPE_ORDER={
 bureau:[['department','教育局内部'],['workgroup','工作组'],['school','学校'],['external','外部']],
 school:[['department','学校内部'],['parent','家长'],['class','班级'],['external','外部']]
};
function surveyScopeCategories(s){
 const categories=new Set(),snapshot=Array.isArray(s?.recipientSnapshot)?s.recipientSnapshot:[];
 snapshot.forEach(item=>{
  const sources=Array.isArray(item?.sourceCategories)&&item.sourceCategories.length?item.sourceCategories:Array.isArray(item?.category)?item.category:[item?.category];
  sources.filter(Boolean).forEach(category=>categories.add(category==='legacy'?'department':category))
 });
 if(!snapshot.length&&Number(s?.total)>0)categories.add('department');
 if(s?.allowExternal===true||(s?.channel&&s.channel!=='internal'))categories.add('external');
 return categories
}
function surveyDataScope(s){const categories=surveyScopeCategories(s),order=SURVEY_SCOPE_ORDER[state.portal]||[];return order.filter(([category])=>categories.has(category)).map(([,label])=>label).join(' + ')||'—'}
function allSurveyDetailPage(){const id=Number(state.page.split('/')[1]),back=state.surveyDetailBack||'#all-surveys',backLabel=back==='#list'?'返回我的问卷':'返回问卷管理',s=CONFIG[state.portal].surveys.find(x=>x.id===id&&x.deleted!==1);if(!s)return `<a class="back-link" href="${back}">← ${backLabel}</a><div class="empty-state detail-empty"><b>问卷不存在或无权查看</b><span>该问卷已删除、不属于当前组织，或链接无效。</span></div>`;const questions=surveyQuestions(s);return `<a class="back-link" href="${back}">← ${backLabel}</a>${pageHead('问卷详情','只读查看问卷配置、接收人员与答卷明细。')}<div class="detail-head"><div class="detail-title">${esc(s.title)}</div><div class="detail-meta"><span>创建人员：${esc(s.owner)}</span><span>创建时间：${s.createdAt}</span><span>问卷类型：${esc(surveyTypeLabel(s))}</span><span class="tag ${s.status}">${s.statusText}</span></div></div><section class="form-card"><div class="section-title">基础信息与发布设置</div><div class="detail-info-grid"><div><span>问卷名称</span><b>${esc(s.title)}</b></div><div><span>问卷类型</span><b>${esc(surveyTypeLabel(s))}</b></div><div><span>接收人员</span><b>${esc(s.target)}</b></div><div><span>填写周期</span><b>${esc(s.time)}</b></div><div class="detail-data-scope"><span>数据范围</span><b>${esc(surveyDataScope(s))}</b></div></div></section><section class="form-card readonly-questions"><div class="section-title">问卷题目 <span class="subtle">共 ${questions.length} 题</span></div>${surveyDetailQuestions(s)}</section>${s.done?`<section class="form-card"><div class="section-title">答卷明细</div>${detailStats(s)}</section>`:''}`}
function allSurveyResponsePage(){const parts=state.page.split('/'),surveyId=Number(parts[1]),responseId=decodeRoutePart(parts[3]),s=CONFIG[state.portal].surveys.find(x=>x.id===surveyId&&x.deleted!==1),back=s?`#all-surveys/${s.id}`:'#all-surveys';if(!s)return `<a class="back-link" href="#all-surveys">← 返回问卷管理</a><div class="empty-state detail-empty"><b>答卷不存在或无权查看</b><span>对应问卷已删除、不属于当前组织，或链接无效。</span></div>`;const person=statsPeopleData('submitted',s,true).find(item=>item.responseId===responseId);if(!person)return `<a class="back-link" href="${back}">← 返回问卷详情</a><div class="empty-state detail-empty"><b>答卷不存在或无权查看</b><span>该答卷不存在、已失效，或不属于当前组织。</span></div>`;const questions=statsQuestions(s);return `<a class="back-link" href="${back}">← 返回问卷详情</a>${pageHead('答卷详情','')}<section class="response-record-card"><div class="response-record-title"><div><h2>${esc(s.title)}</h2><p>答卷编号：${esc(person.responseId)}</p></div><span class="tag running">${esc(person.status)}</span></div><div class="response-record-meta"><div><span>提交人</span><b>${esc(person.name)}</b></div><div><span>所属组织</span><b>${esc(person.scope)}</b></div><div><span>身份</span><b>${esc(person.identity)}</b></div><div><span>手机号</span><b>${esc(person.mobile)}</b></div><div><span>提交时间</span><b>${esc(person.submittedAt)}</b></div></div></section><section class="response-answer response-record-answers card"><div class="response-answer-head"><div><h3>问卷内容</h3><p>共 ${questions.length} 题，以下为该用户本次提交的完整内容。</p></div></div><div class="answer-list">${questions.map((question,index)=>`<div class="answer-item"><span>${String(index+1).padStart(2,'0')}</span><div><b>${esc(question.title)}</b><small>${esc(question.type)}</small><p>${esc(person.answers[index]||'—')}</p></div></div>`).join('')}</div></section>`}
function filterOptions(items,value){return items.map(item=>{const pair=Array.isArray(item)?item:[item,item||'全部'];return `<option value="${pair[0]}" ${pair[0]===value?'selected':''}>${pair[1]}</option>`}).join('')}
function steps(){return `<div class="steps">${['基础信息','问卷设计','接收人员','收集设置'].map((x,i)=>`<div class="step ${state.step===i+1?'active':state.step>i+1?'done':''}"><span class="step-num">${state.step>i+1?'✓':i+1}</span>${x}</div>`).join('')}</div>`}
function templateSteps(){return `<div class="steps">${['基础信息','问卷设计'].map((x,i)=>`<div class="step ${state.step===i+1?'active':state.step>i+1?'done':''}"><span class="step-num">${state.step>i+1?'✓':i+1}</span>${x}</div>`).join('')}</div>`}
function editingSurveyRecord(){return state.editingSurveyId?CONFIG[state.portal].surveys.find(item=>item.id===state.editingSurveyId&&item.deleted!==1&&item.owner===currentUserName()):null}
function createPage(editing=false){const existing=editing?editingSurveyRecord():null,publishedEdit=existing?.status==='not_started',title=publishedEdit?'编辑问卷':editing?'编辑草稿':'新增问卷',actions=publishedEdit?'':'<button class="btn" data-action="save-draft">保存草稿</button>';return `<a class="back-link" href="#list">← 返回我的问卷</a>${pageHead(title,'完成问卷设计、对象选择与收集设置。',actions)} ${steps()} ${state.step===1?basicStep():state.step===2?editorStep():state.step===3?objectStep():publishStep(publishedEdit?'save':'publish')}`}
function editSurveyPage(){const id=Number(state.page.split('/')[2]),s=CONFIG[state.portal].surveys.find(item=>item.id===id&&item.deleted!==1&&['draft','not_started'].includes(item.status)&&item.owner===currentUserName());if(!s)return `<a class="back-link" href="#list">← 返回我的问卷</a><div class="empty-state detail-empty"><b>问卷不存在或不可编辑</b><span>该问卷已删除、状态已变化，或不属于当前用户。</span></div>`;syncSurveyTemporalStatus(s);if(!['draft','not_started'].includes(s.status))return `<a class="back-link" href="#list">← 返回我的问卷</a><div class="empty-state detail-empty"><b>问卷状态已变化</b><span>该问卷已开始，当前不可继续编辑。</span></div>`;if(state.editingSurveyId!==s.id)loadEditableSurveyState(s);return createPage(true)}
function createTemplatePage(){const routeId=state.page.startsWith('templates/edit/')?decodeURIComponent(state.page.split('/')[2]||''):'';if(routeId&&String(state.editingSurveyTemplateId)!==routeId){const item=surveyTemplateItems().find(x=>String(x.id)===routeId);if(!item)return `<a class="back-link" href="#templates">← 返回模板中心</a><div class="empty-state"><b>模板不存在</b><span>该模板已被删除或不属于当前端。</span></div>`;if(item.source==='system'){state.editingSurveyTemplateId=null;setTimeout(()=>{location.hash='templates';setTimeout(()=>toast('系统模板不可编辑'),0)},0);return `<a class="back-link" href="#templates">← 返回模板中心</a><div class="empty-state"><b>系统模板不可编辑</b><span>正在返回模板中心。</span></div>`}loadSurveyTemplateState(item,true)}if(state.step<1||state.step>2)state.step=1;const editing=Boolean(routeId);return `<a class="back-link" href="#templates">← 返回模板中心</a>${pageHead(editing?'编辑模板':'新增模板','配置模板的基础信息与问卷题目。')} ${templateSteps()} ${state.step===1?templateBasicStep():templateEditorStep()}`}
function basicStep(){return `<div class="basic-layout"><div class="form-card"><div class="section-title">基础信息</div><div class="form-grid"><div class="field full"><label class="required">问卷标题</label><input id="survey-title" type="text" maxlength="50" value="${esc(state.draftTitle)}" placeholder="请输入清晰、具体的问卷标题"></div><div class="field full"><label class="required">问卷类型</label><select id="survey-type" class="select">${surveyTypeOptions(state.draftSurveyTypeId)}</select></div><div class="field full"><label>问卷说明</label><textarea id="survey-description" maxlength="500" placeholder="说明调查目的、填写要求和数据用途">${esc(state.draftDescription)}</textarea></div></div><div class="footer-actions"><button class="btn primary" data-action="next">下一步</button></div></div></div>`}
function templateBasicStep(){return `<div class="basic-layout"><div class="form-card"><div class="section-title">基础信息</div><div class="form-grid"><div class="field full"><label class="required">模板名称</label><input id="survey-title" type="text" maxlength="50" value="${esc(state.draftTitle)}" placeholder="请输入模板名称"></div><div class="field full"><label class="required">问卷类型</label><select id="survey-type" class="select">${surveyTypeOptions(state.draftSurveyTypeId)}</select></div><div class="field full"><label>问卷说明</label><textarea id="survey-description" maxlength="500" placeholder="说明模板适用场景与填写要求">${esc(state.draftDescription)}</textarea></div></div><div class="footer-actions"><button class="btn primary" data-action="next">下一步</button></div></div></div>`}
let questionIdSequence=0;
function nextQuestionId(){questionIdSequence+=1;return`q${Date.now()}-${questionIdSequence}`}
function questionValue(q={},index=0){return{id:q.id||nextQuestionId(),type:q.type||'填空',title:q.title??'',required:Boolean(q.required),options:[...(q.options||[])],imageOnly:Boolean(q.imageOnly),includeTime:Boolean(q.includeTime),detailedAddress:Boolean(q.detailedAddress)}}
function defaultQuestions(){return [{type:'单选',title:'您目前主要任教的学段是？',required:true,options:['小学','初中','高中']},{type:'多选',title:'您在教学中使用过哪些数字化工具？',required:true,options:['智慧课堂','在线作业','AI备课','资源平台']},{type:'填空',title:'您希望获得哪些方面的培训支持？',required:false,options:[]}].map(questionValue)}
function cloneQuestions(questions){return (questions||[]).map((q,index)=>questionValue(q,index))}
function questionKind(type='填空'){const value=String(type).replace(/题$/,'');if(value.includes('单选'))return'single';if(value.includes('多选'))return'multiple';if(value.includes('日期'))return'date';if(value.includes('文件')||value.includes('图片'))return'file';if(value.includes('签名'))return'signature';if(value.includes('位置'))return'location';return'text'}
function questionTypeLabel(type){const kind=questionKind(type),labels={text:'填空题',single:'单选题',multiple:'多选题',date:'日期题',file:'文件/图片题',signature:'签名题',location:'位置题'};return labels[kind]}
const QUESTION_TYPES=['填空','单选','多选','日期','文件/图片','签名','位置'];
function questionTrack(event,details={}){const question=Number.isInteger(details.index)?state.questions[details.index]:null,record={event,portal:state.portal,device:state.preview,survey_id:state.editingSurveyId||'',template_id:state.editingSurveyTemplateId||'',question_id:question?.id||details.questionId||'',question_type:question?.type||details.questionType||'',timestamp:formatSystemTime(),...details};window.__questionEvents=window.__questionEvents||[];window.__questionEvents.push(record)}
function readableAnswerValue(value){return Array.isArray(value)?value.join('、'):String(value??'')}
function demoSurveyQuestions(s){const subject=String(s.title||'本问卷').replace(/调查|调研|问卷|征集/g,'').slice(0,18)||'本问卷',school=state.portal==='school';return cloneQuestions([{type:'填空',title:'请填写您的姓名',required:true,options:[]},{type:'单选',title:school?'您所属的年级是？':'您所在的学校是？',required:true,options:school?['七年级','八年级','九年级']:['实验学校','第一小学','第二中学','其他学校']},{type:'多选',title:`您认为“${subject}”应重点关注哪些方面？`,required:true,options:['数字化教学资源','教师培训与教研','校园安全服务','家校沟通服务']},{type:'日期',title:`请选择您参与“${subject}”的日期`,required:false,options:[]},{type:'文件/图片',title:`请上传与“${subject}”相关的文件或图片`,required:false,options:[]},{type:'签名',title:`请确认“${subject}”填写内容并签名`,required:true,options:[]},{type:'位置',title:`请选择您填写“${subject}”时所在的位置`,required:false,options:[]}])}
function surveyQuestions(s){if(!s)return[];if(!Array.isArray(s.questions))s.questions=demoSurveyQuestions(s);return s.questions}
function templateQuestionSchema(title,summary){const fields=String(summary||'').split('、').filter(Boolean);return cloneQuestions(fields.map((field,index)=>({type:index===1?'单选':'填空',title:field,required:index<2,options:index===1?['选项一','选项二']:[]})))}
const COMMON_QUESTIONS={phone:{title:'手机号',type:'填空',options:[]},gender:{title:'性别',type:'单选',options:['男','女']},idCard:{title:'身份证',type:'填空',options:[]},age:{title:'年龄',type:'填空',options:[]},className:{title:'所在班级',type:'填空',options:[]},department:{title:'所在部门',type:'填空',options:[]}};
function ensureTemplateStores(){
 if(SURVEY_TEMPLATE_STORE)return;
 const surveySeeds={
  bureau:[
   ['教师数字素养调研','工具应用、培训需求、意见建议',101],
   ['学校发展情况调查','办学条件、师资、发展困难',102],
   ['教育质量评价','课程实施、课堂质量、评价反馈',101],
   ['教师培训需求','学科、能力短板、培训形式',101],
   ['区域满意度调查','家长评价、社会意见、改进建议',102],
   ['校园安全专项检查','设施、制度、风险、整改情况',102]
  ],
  school:[
   ['通讯录收集','姓名、性别、手机号、微信号',202],
   ['班级作业收集','学生姓名、班级、作业附件',201],
   ['上下学交通调查','交通方式、接送人、位置',202],
   ['请假名单收集','学生姓名、日期、请假原因',202],
   ['新生报名登记','新生姓名、性别、证件信息',202],
   ['教师满意度调查','工作环境、管理评价、建议',201]
  ]
 };
 SURVEY_TEMPLATE_STORE={
  bureau:surveySeeds.bureau.map(([title,summary,surveyTypeId],i)=>({id:`bureau-survey-system-${i+1}`,title,description:'',summary,surveyTypeId,questions:templateQuestionSchema(title,summary),creator:'系统',createdAt:`2026-08-${String(i+1).padStart(2,'0')} 09:00:00`,source:'system'})),
  school:surveySeeds.school.map(([title,summary,surveyTypeId],i)=>({id:`school-survey-system-${i+1}`,title,description:'',summary,surveyTypeId,questions:templateQuestionSchema(title,summary),creator:'系统',createdAt:`2026-08-${String(i+1).padStart(2,'0')} 09:00:00`,source:'system'}))
 };
 SURVEY_TEMPLATE_STORE.bureau.unshift({id:'bureau-survey-custom-1',title:'学期重点工作反馈',description:'',summary:'重点任务、完成进度、困难建议',surveyTypeId:102,questions:templateQuestionSchema('学期重点工作反馈','重点任务、完成进度、困难建议'),creator:'王明',createdAt:'2026-08-13 11:25:00',source:'custom'});
 SURVEY_TEMPLATE_STORE.school.unshift({id:'school-survey-custom-1',title:'班级情况周报',description:'',summary:'班级、出勤情况、本周事项',surveyTypeId:202,questions:templateQuestionSchema('班级情况周报','班级、出勤情况、本周事项'),creator:'陈芳',createdAt:'2026-08-13 15:40:00',source:'custom'});
 SURVEY_TEMPLATE_STORE.bureau.push({id:'bureau-survey-system-safety',title:'校园安全隐患排查',description:'',summary:'隐患位置、问题等级、整改要求',surveyTypeId:103,questions:templateQuestionSchema('校园安全隐患排查','隐患位置、问题等级、整改要求'),creator:'系统',createdAt:'2026-08-07 09:00:00',source:'system'},{id:'bureau-survey-custom-event',title:'专题活动效果反馈',description:'',summary:'活动名称、参与评价、改进建议',surveyTypeId:105,questions:templateQuestionSchema('专题活动效果反馈','活动名称、参与评价、改进建议'),creator:'王明',createdAt:'2026-08-14 11:00:00',source:'custom'});
 SURVEY_TEMPLATE_STORE.school.push({id:'school-survey-system-safety',title:'校园安全隐患排查',description:'',summary:'隐患位置、问题等级、整改要求',surveyTypeId:203,questions:templateQuestionSchema('校园安全隐患排查','隐患位置、问题等级、整改要求'),creator:'系统',createdAt:'2026-08-07 09:00:00',source:'system'},{id:'school-survey-custom-teacher',title:'教师成长需求反馈',description:'',summary:'发展方向、培训需求、支持建议',surveyTypeId:205,questions:templateQuestionSchema('教师成长需求反馈','发展方向、培训需求、支持建议'),creator:'陈芳',createdAt:'2026-08-14 11:00:00',source:'custom'});
 Object.values(SURVEY_TEMPLATE_STORE).forEach(items=>items.forEach((item,index)=>{item.demoRank=index+1}));
}
function surveyTemplateItems(){ensureTemplateStores();return SURVEY_TEMPLATE_STORE[state.portal]}
function availableCommonQuestions(){return Object.entries(COMMON_QUESTIONS).map(([id,q])=>({id,...q,required:false,source:'system'}))}
function questionToolbox(){return `<aside class="toolbox"><div class="section-title">添加题目</div><p class="toolbox-hint">点击追加，或拖动到右侧指定位置</p><details class="tool-group" open><summary>常用问题</summary><div class="tool-group-items">${availableCommonQuestions().map(q=>`<button class="tool-item" draggable="true" data-add-question-template="${q.id}" data-tool-template="${q.id}">＋ ${esc(q.title)}</button>`).join('')}</div></details><details class="tool-group" open><summary>自定义问题</summary><div class="tool-group-items">${['填空','单选','多选','日期','文件/图片','签名','位置'].map(x=>`<button class="tool-item" draggable="true" data-add-type="${x}" data-tool-type="${x}">＋ ${x}</button>`).join('')}</div></details></aside>`}
function questionPickerContent(){return `<div class="question-picker"><div class="question-picker-head"><h3>添加问题</h3><button class="picker-close" data-picker-close>×</button></div><details class="picker-group" open><summary>常用问题</summary><div class="picker-items">${availableCommonQuestions().map(q=>`<button class="picker-item" data-picker-template="${q.id}"><i></i>${esc(q.title)}</button>`).join('')}</div></details><details class="picker-group" open><summary>自定义问题</summary><div class="picker-items">${['填空','单选','多选','日期','文件/图片','签名','位置'].map(x=>`<button class="picker-item" data-picker-type="${x}"><i></i>${x}</button>`).join('')}</div></details></div>`}
function openQuestionPicker(){const m=$('#modal');m.innerHTML=questionPickerContent();m.classList.add('show','question-picker-mask');decorateOverlay($('.question-picker',m),'question-picker');const close=()=>{closePrd('route_change');m.classList.remove('show','question-picker-mask');m.innerHTML=''};m.querySelector('[data-picker-close]').onclick=close;m.querySelectorAll('[data-picker-template]').forEach(b=>b.onclick=()=>{addQuestionTemplate(b.dataset.pickerTemplate);close()});m.querySelectorAll('[data-picker-type]').forEach(b=>b.onclick=()=>{addCustomQuestion(b.dataset.pickerType);close()});m.onclick=e=>{if(e.target===m)close()}}
function canAddQuestion(){if(state.questions.length<100)return true;toast('单份问卷最多添加 100 道题');return false}
function insertQuestion(question,index=state.questions.length){if(!canAddQuestion())return false;const target=Math.max(0,Math.min(index,state.questions.length)),value=questionValue({...question,id:''},state.questions.length);state.questions.splice(target,0,value);state.questionError=-1;questionTrack('question_add',{index:target,questionId:value.id,questionType:value.type});renderShell();return true}
function addCommonQuestion(key,index){const preset=COMMON_QUESTIONS[key];if(preset)insertQuestion({...preset,required:false},index)}
function addQuestionTemplate(id,index){const preset=availableCommonQuestions().find(q=>String(q.id)===String(id));if(preset)insertQuestion(preset,index)}
function addCustomQuestion(type,index){insertQuestion({type,title:'',required:false,options:['单选','多选'].includes(type)?['选项一','选项二']:[]},index)}
function normalizedOptions(value){return String(value||'').split('\n').map(x=>x.trim()).filter(Boolean)}
function questionValidationError(title,type,options=[]){if(!title)return'请输入题目标题';if(title.length>200)return'题目标题不能超过 200 个字符';if(['单选','多选'].includes(type)){if(options.length<2)return'单选或多选题至少需要两个非空选项';if(options.length>20)return'单选或多选题最多设置 20 个选项';if(options.some(x=>x.length>50))return'每个选项不能超过 50 个字符'}return''}
function mobileAnswerValidationError(answers){if(!answers.name)return'请输入姓名';if(answers.name.length>20)return'姓名不能超过 20 个字符';if(!answers.gender)return'请选择性别';if(answers.wechat&&!/^[A-Za-z][A-Za-z0-9_-]{5,19}$/.test(answers.wechat))return'微信号须为 6～20 个字符，以字母开头且仅含字母、数字、下划线或连字符';if(answers.qq&&!/^\d{5,12}$/.test(answers.qq))return'QQ号须为 5～12 位数字';return''}
function editorStep(){return `<div class="editor inline-editor">${questionToolbox()}<section class="question-list"><div class="section-title">问卷题目 <span class="subtle">共 ${state.questions.length} 题</span></div><div id="questions" class="inline-question-list">${questionDropZone(0)}${state.questions.map((q,i)=>questionCard(q,i)+questionDropZone(i+1)).join('')}</div><div class="footer-actions"><button class="btn" data-action="prev">上一步</button><button class="btn primary" data-action="next">下一步</button></div></section></div>`}
function templateEditorStep(){return editorStep().replace('<button class="btn primary" data-action="next">下一步</button>','<button class="btn primary" data-action="save-template">保存模板</button>')}
function questionDropZone(index){return `<div class="question-drop-zone" data-question-drop="${index}"><span>放置题目到这里</span></div>`}
function questionOptionsEditor(q,i){
  if(!['单选','多选'].includes(q.type))return'';
  return `<div class="inline-options">${q.options.map((option,j)=>`<div class="inline-option" data-option-drop="${i}" data-option-index="${j}"><span>${q.type==='单选'?'○':'□'}</span><input maxlength="50" value="${esc(option)}" placeholder="请输入选项" data-q-option="${i}" data-option-index="${j}"><button type="button" data-option-delete="${i}" data-option-index="${j}" aria-label="删除选项">−</button><i draggable="true" data-option-drag="${i}" data-option-index="${j}" tabindex="0" role="button" aria-label="拖动第 ${j+1} 个选项调整顺序">☰</i></div>`).join('')}<button type="button" class="add-inline-option" data-option-add="${i}">⊕ 新增选项</button></div>`;
}
function questionSpecificSettings(q,i){if(q.type==='文件/图片')return `<label class="inline-setting"><input type="checkbox" data-q-setting="imageOnly" data-i="${i}" ${q.imageOnly?'checked':''}> 仅允许上传图片</label>`;if(q.type==='日期')return `<label class="inline-setting"><input type="checkbox" data-q-setting="includeTime" data-i="${i}" ${q.includeTime?'checked':''}> 时分</label>`;if(q.type==='位置')return `<label class="inline-setting"><input type="checkbox" data-q-setting="detailedAddress" data-i="${i}" ${q.detailedAddress?'checked':''}> 详情地址</label>`;return''}
function questionCard(q,i){
  const preview=q.type==='填空'?'请输入':q.type==='日期'?`▣ 填写格式: 年-月-日${q.includeTime?' 时:分':''}`:q.type==='文件/图片'?'文件/图片上传区域':q.type==='签名'?'签名区域':q.type==='位置'?`省市区选择${q.detailedAddress?' + 详细地址':''}`:'';
  return `<article class="question-card inline-question-card ${state.questionError===i?'has-error':''}" data-question-index="${i}"><header class="inline-q-head"><b>${String(i+1).padStart(2,'0')}.</b><input class="inline-q-title" maxlength="200" value="${esc(q.title)}" placeholder="编写标题" data-q-title="${i}"><div class="inline-q-menu"><button type="button" data-q-menu="${i}" aria-label="题目操作" aria-expanded="${state.questionMenu===i}">•••</button>${state.questionMenu===i?`<div class="q-menu-popover"><button data-q-action="up" data-i="${i}" ${i===0?'disabled':''}>上移</button><button data-q-action="down" data-i="${i}" ${i===state.questions.length-1?'disabled':''}>下移</button><button data-q-action="copy" data-i="${i}">复制</button><button class="danger" data-q-action="delete" data-i="${i}">删除</button></div>`:''}</div></header>${questionOptionsEditor(q,i)}${preview?`<div class="inline-answer-preview">${preview}</div>`:''}<div class="inline-q-settings">${questionSpecificSettings(q,i)}<label class="inline-setting"><input type="checkbox" data-q-setting="required" data-i="${i}" ${q.required?'checked':''}> 必填</label></div><footer class="inline-q-footer"><span class="inline-q-type-wrap" aria-label="第 ${i+1} 题题目类型"><span class="inline-q-type">${esc(q.type)}</span></span><i draggable="true" data-question-drag="${i}" tabindex="0" role="button" aria-label="拖动第 ${i+1} 题调整顺序">☰</i></footer><p class="inline-q-error">${state.questionError===i?esc(questionValidationError(q.title.trim(),q.type,q.options.map(x=>x.trim()).filter(Boolean))):''}</p></article>`;
}
function firstQuestionError(){if(!state.questions.length)return{index:-1,message:'请至少添加一道题目'};if(state.questions.length>100)return{index:-1,message:'单份问卷最多添加 100 道题'};for(let i=0;i<state.questions.length;i++){const q=state.questions[i],error=questionValidationError(q.title.trim(),q.type,q.options.map(x=>x.trim()).filter(Boolean));if(error)return{index:i,message:`第 ${i+1} 题：${error}`}}return null}
function showQuestionError(result){if(!result)return false;state.questionError=result.index;state.step=2;questionTrack('question_validation_failed',{index:result.index,error_message:result.message});if(state.preview==='mobile')state.page='mobile/create';renderShell();setTimeout(()=>{const target=result.index>=0?$(`[data-question-index="${result.index}"]`):$('#questions');target?.scrollIntoView({behavior:'smooth',block:'center'});target?.querySelector('.inline-q-title')?.focus()},0);toast(result.message);return true}
function moveQuestion(from,to){if(from===to||from<0||from>=state.questions.length||to<0||to>=state.questions.length)return;const [item]=state.questions.splice(from,1);state.questions.splice(to,0,item);state.questionMenu=-1;state.questionError=-1;questionTrack('question_reorder',{questionId:item.id,questionType:item.type,from_index:from,to_index:to});renderShell()}
function moveOption(questionIndex,from,to){const question=state.questions[questionIndex];if(!question||from===to||from<0||to<0||from>=question.options.length||to>=question.options.length)return;const [item]=question.options.splice(from,1);question.options.splice(to,0,item);questionTrack('question_option_reorder',{index:questionIndex,from_index:from,to_index:to});renderShell()}
function bindQuestionEditor(){
  $$('[data-q-title]').forEach(input=>{input.oninput=()=>{state.questions[+input.dataset.qTitle].title=input.value;state.questionError=-1};input.onchange=()=>questionTrack('question_title_change',{index:+input.dataset.qTitle})});
  $$('[data-q-option]').forEach(input=>{input.oninput=()=>{state.questions[+input.dataset.qOption].options[+input.dataset.optionIndex]=input.value;state.questionError=-1};input.onchange=()=>questionTrack('question_option_change',{index:+input.dataset.qOption,option_index:+input.dataset.optionIndex})});
  $$('[data-q-setting]').forEach(input=>input.onchange=()=>{const index=+input.dataset.i;state.questions[index][input.dataset.qSetting]=input.checked;state.questionError=-1;questionTrack('question_setting_change',{index,field_name:input.dataset.qSetting,value:input.checked});renderShell()});
  $$('[data-option-add]').forEach(button=>button.onclick=()=>{const index=+button.dataset.optionAdd,q=state.questions[index];if(q.options.length>=20)return toast('单选或多选题最多设置 20 个选项');q.options.push('');questionTrack('question_option_add',{index,option_index:q.options.length-1});renderShell()});
  $$('[data-option-delete]').forEach(button=>button.onclick=()=>{const index=+button.dataset.optionDelete,optionIndex=+button.dataset.optionIndex;state.questions[index].options.splice(optionIndex,1);questionTrack('question_option_delete',{index,option_index:optionIndex});renderShell()});
  $$('[data-q-menu]').forEach(button=>button.onclick=e=>{e.stopPropagation();const i=+button.dataset.qMenu;state.questionMenu=state.questionMenu===i?-1:i;renderShell()});
  let drag=null;
  $$('[data-tool-template],[data-tool-type]').forEach(item=>item.ondragstart=e=>{drag={kind:item.dataset.toolTemplate?'template':'type',value:item.dataset.toolTemplate||item.dataset.toolType};e.dataTransfer.effectAllowed='copy'});
  $$('[data-question-drag]').forEach(handle=>{handle.ondragstart=e=>{drag={kind:'question',index:+handle.dataset.questionDrag};e.dataTransfer.effectAllowed='move'};handle.onkeydown=e=>{const i=+handle.dataset.questionDrag;if(e.key==='ArrowUp'&&i>0){e.preventDefault();moveQuestion(i,i-1)}if(e.key==='ArrowDown'&&i<state.questions.length-1){e.preventDefault();moveQuestion(i,i+1)}}});
  $$('[data-question-drop]').forEach(zone=>{zone.ondragover=e=>{e.preventDefault();zone.classList.add('active')};zone.ondragleave=()=>zone.classList.remove('active');zone.ondrop=e=>{e.preventDefault();const index=+zone.dataset.questionDrop;if(!drag)return;if(drag.kind==='template')addQuestionTemplate(drag.value,index);else if(drag.kind==='type')addCustomQuestion(drag.value,index);else{let target=index;if(drag.index<target)target--;if(target!==drag.index){const [item]=state.questions.splice(drag.index,1);state.questions.splice(target,0,item);renderShell()}}drag=null}});
  $$('[data-option-drag]').forEach(handle=>{handle.ondragstart=e=>{e.stopPropagation();drag={kind:'option',question:+handle.dataset.optionDrag,index:+handle.dataset.optionIndex};e.dataTransfer.effectAllowed='move'};handle.onkeydown=e=>{const question=+handle.dataset.optionDrag,index=+handle.dataset.optionIndex,count=state.questions[question]?.options.length||0;if(e.key==='ArrowUp'&&index>0){e.preventDefault();moveOption(question,index,index-1)}if(e.key==='ArrowDown'&&index<count-1){e.preventDefault();moveOption(question,index,index+1)}}});
  $$('[data-option-drop]').forEach(row=>{row.ondragover=e=>{if(drag?.kind==='option'&&drag.question===+row.dataset.optionDrop)e.preventDefault()};row.ondrop=e=>{e.preventDefault();if(!drag||drag.kind!=='option'||drag.question!==+row.dataset.optionDrop)return;const question=drag.question,from=drag.index,to=+row.dataset.optionIndex;drag=null;moveOption(question,from,to)}});
  $$('[data-question-drag]').forEach(handle=>handle.onpointerdown=e=>{if(e.pointerType==='mouse')return;const from=+handle.dataset.questionDrag;handle.setPointerCapture(e.pointerId);handle.onpointerup=up=>{const target=document.elementFromPoint(up.clientX,up.clientY)?.closest('[data-question-index]'),to=target?+target.dataset.questionIndex:from;handle.releasePointerCapture(up.pointerId);if(to!==from)moveQuestion(from,to)}});
  $$('[data-option-drag]').forEach(handle=>handle.onpointerdown=e=>{if(e.pointerType==='mouse')return;const question=+handle.dataset.optionDrag,from=+handle.dataset.optionIndex;handle.setPointerCapture(e.pointerId);handle.classList.add('is-touch-dragging');const finish=up=>{handle.classList.remove('is-touch-dragging');if(handle.hasPointerCapture?.(up.pointerId))handle.releasePointerCapture(up.pointerId);const target=document.elementFromPoint(up.clientX,up.clientY)?.closest(`[data-option-drop="${question}"]`),to=target?+target.dataset.optionIndex:from;handle.onpointerup=null;handle.onpointercancel=null;if(up.type==='pointerup'&&to!==from)moveOption(question,from,to)};handle.onpointerup=finish;handle.onpointercancel=finish});
}
function recipientTabs(){return state.portal==='bureau'?[['department','部门'],['school','学校']]:[['department','部门'],['parent','家长'],['class','班级']]}
function recipientTabMeta(){return state.portal==='bureau'?{department:['部门','选择教育局内部部门或下属人员'],school:['学校','选择学校管理员或默认职位，不向学生及家长发送']}:{department:['部门','按部门展开并选择具体人员，部门本身不可选择'],parent:['家长','按年级或班级选择学生家长'],class:['班级','按年级选择全部或部分班级']}}
function recipientExpanded(id,defaultOpen=true){return state.recipientExpansion.has(id)?state.recipientExpansion.get(id):defaultOpen}
function recipientCount(){return [...state.recipients.values()].reduce((sum,x)=>sum+x.count,0)}
function recipientSummary(){const names=[...state.recipients.values()].map(x=>x.name);if(state.externalRecipient)names.push('外部人员');return names.length>2?`${names.slice(0,2).join('、')}等 ${names.length} 项`:names.join('、')||'未选择'}
function departmentPersonMode(){return state.recipientTab==='department'&&Boolean(DEPARTMENT_PEOPLE[state.portal])}
function recipientCheckbox(item,parentId=''){const selected=state.recipients.has(item.id)||(parentId&&state.recipients.has(parentId)),displayName=item.displayName||item.name;return `<label class="recipient-row" data-recipient-row data-name="${esc(displayName)}" data-search="${esc(displayName)}"><input type="checkbox" data-recipient-id="${item.id}" data-recipient-name="${esc(item.name)}" data-recipient-count="${item.count}" data-recipient-parent="${parentId}" ${selected?'checked':''}><span>${esc(displayName)}</span><em>${item.count} 人</em></label>`}
function departmentPersonRow(person,mobile=false){const selected=state.recipients.has(person.personId),search=[person.name,person.departmentName].join(' ');if(mobile)return `<label class="mobile-recipient-child department-person-row" data-recipient-row data-recipient-child-row data-name="${esc(person.name)}" data-search="${esc(search)}"><input type="checkbox" data-recipient-person="true" data-recipient-id="${person.personId}" data-recipient-name="${esc(person.name)}" data-recipient-count="1" data-recipient-parent="${person.departmentId}" data-recipient-department="${esc(person.departmentName)}" data-recipient-position="${esc(person.position)}" ${selected?'checked':''}><span>${esc(person.name)}</span></label>`;return `<label class="recipient-row department-person-row" data-recipient-row data-recipient-child-row data-name="${esc(person.name)}" data-search="${esc(search)}"><input type="checkbox" data-recipient-person="true" data-recipient-id="${person.personId}" data-recipient-name="${esc(person.name)}" data-recipient-count="1" data-recipient-parent="${person.departmentId}" data-recipient-department="${esc(person.departmentName)}" data-recipient-position="${esc(person.position)}" ${selected?'checked':''}><span>${esc(person.name)}</span></label>`}
function treeRecipientContent(kind){return RECIPIENT_DATA[state.portal][kind].map(group=>{const open=recipientExpanded(group.id,true);return `<div class="recipient-group ${open?'expanded':''}" data-recipient-group data-name="${esc(group.name)}"><div class="recipient-parent-row"><button class="recipient-expander" data-toggle-recipient-node="${group.id}" aria-label="${open?'收起':'展开'}${esc(group.name)}">${open?'⌄':'›'}</button>${recipientCheckbox(group)}</div><div class="recipient-children ${open?'show':''}" data-recipient-children="${group.id}">${group.children.map(x=>recipientCheckbox({id:x[0],name:x[1],count:x[2]},group.id)).join('')}</div></div>`}).join('')}
function departmentPersonContent(mobile=false){return DEPARTMENT_PEOPLE[state.portal].map(group=>{const open=recipientExpanded(group.id,mobile?false:true),people=recipientChildren(group.id),count=people.length,children=count?people.map(person=>departmentPersonRow(person,mobile)).join(''):`<div class="recipient-department-empty">该部门暂无可选人员</div>`;if(mobile)return `<article class="mobile-recipient-group ${open?'open':''}" data-recipient-group data-name="${esc(group.name)}"><div class="mobile-recipient-row department-group-row"><div><span>${esc(group.name)}<small>${count} 名可选人员</small></span></div><button type="button" data-toggle-recipient-node="${group.id}">${open?'收起':'下级'}　›</button></div><div class="mobile-recipient-children recipient-children ${open?'show':''}" data-recipient-children="${group.id}">${children}</div></article>`;return `<div class="recipient-group department-group ${open?'expanded':''}" data-recipient-group data-name="${esc(group.name)}"><div class="recipient-parent-row department-group-row"><button class="recipient-expander" data-toggle-recipient-node="${group.id}" aria-label="${open?'收起':'展开'}${esc(group.name)}">${open?'⌄':'›'}</button><div><b>${esc(group.name)}</b></div><em>${count} 人</em></div><div class="recipient-children ${open?'show':''}" data-recipient-children="${group.id}">${children}</div></div>`}).join('')}
function bureauSchoolContent(){const eligibleCount=SCHOOL_ROLES.reduce((sum,r)=>sum+r[2],0);return RECIPIENT_DATA.bureau.school.map(s=>{const full=state.recipients.has(s.id),open=recipientExpanded(s.id,false),school={...s,count:eligibleCount},roles=SCHOOL_ROLES.map((r,i)=>`${i===0||SCHOOL_ROLES[i-1][3]!==r[3]?`<div class="school-role-group-title">${r[3]}</div>`:''}${recipientCheckbox({id:`${s.id}-${r[0]}`,name:`${s.name}·${r[1]}`,displayName:r[1],count:r[2]},s.id)}`).join('');return `<div class="school-recipient ${open?'expanded':''}" data-school-card data-name="${esc(s.name)}" data-school-type="${s.type}"><div class="school-recipient-head"><button class="recipient-expander" data-toggle-recipient-node="${s.id}" aria-label="${open?'收起':'展开'}${esc(s.name)}">${open?'⌄':'›'}</button>${recipientCheckbox(school)}<span class="recipient-kind">${s.type}</span></div><div class="school-roles ${open?'show':''}" data-recipient-children="${s.id}">${roles}</div>${full?'<div class="hint">已选择该学校全部管理员及默认职位，不包含学生和家长。</div>':''}</div>`}).join('')}
function recipientContent(){if(departmentPersonMode())return departmentPersonContent();if(state.portal==='bureau'&&state.recipientTab==='school')return bureauSchoolContent();return treeRecipientContent(state.recipientTab)}
function objectStep(){const tabs=recipientTabs();if(!tabs.some(x=>x[0]===state.recipientTab))state.recipientTab=tabs[0][0];const schoolFilter=state.portal==='bureau'&&state.recipientTab==='school',personMode=departmentPersonMode(),meta=recipientTabMeta()[state.recipientTab],placeholder=personMode?'搜索姓名或部门':'搜索组织、学校或人员';return `<div class="form-card pc-recipient-card"><div class="section-title">选择接收人员</div><div class="pc-recipient-workspace"><nav class="recipient-side-nav"><div class="recipient-side-title">接收分类</div>${tabs.map(t=>`<button class="recipient-tab ${state.recipientTab===t[0]?'active':''}" data-recipient-tab="${t[0]}"><span>${t[1]}</span><em>›</em></button>`).join('')}</nav><section class="recipient-main-panel"><header class="recipient-panel-head"><div><h3>${meta[0]}</h3><p>${meta[1]}</p></div></header>${state.recipientTab!=='external'?`<div class="recipient-filter"><div class="recipient-search-box"><span>⌕</span><input id="recipient-search" type="text" maxlength="50" value="${esc(state.recipientSearch)}" placeholder="${placeholder}"></div>${schoolFilter?`<select id="school-type-filter" class="select"><option value="">全部学校类型</option>${['小学','初中','九年一贯制'].map(x=>`<option ${state.recipientSchoolType===x?'selected':''}>${x}</option>`).join('')}</select>`:''}</div>${personMode?'<div class="recipient-table-head person-head name-only"><span>人员姓名</span></div>':`<div class="recipient-table-head"><span>名称</span><span>${schoolFilter?'学校类型':'层级'}</span><span>人数</span></div>`}`:''}<div class="recipient-tree pc-recipient-tree">${recipientContent()}<div class="recipient-filter-empty hidden"><b>未找到符合条件的人员</b><span>请调整姓名或部门关键词</span></div></div>${personMode?'':'<div class="notice">系统将自动合并重复人员，动态范围在填写和统计时按最新有效成员解析。</div>'}</section><aside class="recipient-summary-panel"><div class="recipient-summary-head"><h3>${personMode?'已选人员':'已选范围'}</h3><span>${state.recipients.size} 项</span></div><div id="selected-object-list" class="selected-object-list">${selectedObjectList()}</div><div class="recipient-summary-totals"><div class="summary-row"><span>预计参与人数</span><b>${recipientCount()}</b></div><div class="summary-row"><span>重复对象</span><b>0</b></div></div></aside></div><div class="footer-actions pc-recipient-actions"><button class="btn" data-action="prev">上一步</button><button class="btn primary" data-action="next">下一步</button></div></div>`}
function selectedObjectList(){const items=[...state.recipients.values()];return items.length?items.map(x=>`<div class="chosen"><span>${esc(x.name)}${x.level==='person'?'':`<small>${x.count} 人</small>`}</span><button class="link-btn danger" data-remove-recipient="${x.id}" aria-label="移除${esc(x.name)}">×</button></div>`).join(''):'<div class="empty compact-empty">暂未选择接收人员</div>'}
function publishStep(mode='publish'){const daily=applyCollectionSettings(state).frequency==='daily',dailySettings=daily?`<label class="setting-row full collection-daily-setting"><span><b>非工作日不收集</b><small>开启后周末及法定节假日不生成收集任务</small></span><input type="checkbox" id="skip-non-workday" ${state.skipNonWorkday?'checked':''}></label><label class="setting-row full collection-daily-setting"><span><b>每日收集提醒</b><small>每天按设置时间提醒未填写人员</small></span><input type="checkbox" id="daily-reminder" ${state.dailyReminder?'checked':''}></label>${state.dailyReminder?`<div class="field full collection-daily-setting"><label>提醒时间</label><input id="reminder-time" type="time" value="${state.reminderTime}"></div>`:''}`:'';return `<div class="form-layout publish-layout"><div class="form-card"><div class="section-title">收集设置</div><label class="setting-row external-publish-setting"><span><b>是否允许外部人员填写</b></span><input type="checkbox" id="allow-external" ${state.externalRecipient?'checked':''}></label><div class="external-publish-note">外部人员可以通过微信扫描二维码进行填写</div><div class="section-title collection-section-title">收集方式</div><div class="collection-options">${COLLECTION_FREQUENCIES.map(x=>`<label class="collection-option ${state.frequency===x.value?'active':''}"><input type="radio" name="frequency" value="${x.value}" data-frequency="${x.value}" ${state.frequency===x.value?'checked':''}><span><b>${x.label}</b><small>${x.description}</small></span></label>`).join('')}</div><div class="form-grid collection-grid"><div class="field"><label class="required">开始日期</label><input id="start-date" type="date" value="${state.startDate}"></div><div class="field"><label class="required">截止日期</label><input id="end-date" type="date" value="${state.endDate}"></div>${dailySettings}</div><div class="footer-actions"><button class="btn" data-action="prev">上一步</button><button class="btn primary" data-action="publish">${mode==='save'?'保存修改':'确认发布'}</button></div></div></div>`}
function recipientChildren(parentId){const department=DEPARTMENT_PEOPLE[state.portal]?.find(x=>x.id===parentId);if(department)return department.children.filter(x=>x.status==='active'&&x.canReceive!==false).map(x=>({...x,id:x.personId,count:1}));const source=state.portal==='bureau'&&parentId.startsWith('school-')?SCHOOL_ROLES.map(r=>({id:`${parentId}-${r[0]}`,name:`${RECIPIENT_DATA.bureau.school.find(s=>s.id===parentId)?.name||''}·${r[1]}`,count:r[2]})):[...Object.values(RECIPIENT_DATA[state.portal])].flat().filter(x=>x.children).find(x=>x.id===parentId)?.children.map(x=>({id:x[0],name:x[1],count:x[2]}))||[];return source}
function recipientTrack(event,details={}){const record={event,portal:state.portal,device:state.preview,selected_count:recipientCount(),timestamp:formatSystemTime(),...details};window.__recipientEvents=window.__recipientEvents||[];window.__recipientEvents.push(record)}
function toggleRecipient(input){const id=input.dataset.recipientId,parent=input.dataset.recipientParent,name=input.dataset.recipientName,count=+input.dataset.recipientCount;if(input.dataset.recipientPerson==='true'){const value={id,personId:id,name,count:1,category:'department',parent,departmentId:parent,departmentName:input.dataset.recipientDepartment||'',position:input.dataset.recipientPosition||'',status:'active',level:'person'};input.checked?state.recipients.set(id,value):state.recipients.delete(id);recipientTrack(input.checked?'recipient_person_select':'recipient_person_unselect',{department_id:parent,person_id:id});renderShell();return}if(!parent){recipientChildren(id).forEach(x=>state.recipients.delete(x.id));input.checked?state.recipients.set(id,{id,name,count,category:state.recipientTab,level:'group'}):state.recipients.delete(id)}else{const siblings=recipientChildren(parent);if(state.recipients.has(parent)){state.recipients.delete(parent);siblings.forEach(x=>{if(x.id!==id||input.checked)state.recipients.set(x.id,{...x,category:state.recipientTab,parent,level:'child'})})}else input.checked?state.recipients.set(id,{id,name,count,category:state.recipientTab,parent,level:'child'}):state.recipients.delete(id);if(siblings.length&&siblings.every(x=>state.recipients.has(x.id))){siblings.forEach(x=>state.recipients.delete(x.id));const parentInput=$(`[data-recipient-id="${parent}"]`);state.recipients.set(parent,{id:parent,name:parentInput?.dataset.recipientName||parent,count:+(parentInput?.dataset.recipientCount||siblings.reduce((n,x)=>n+x.count,0)),category:state.recipientTab,level:'group'})}}renderShell()}
function syncRecipientParents(){$$('[data-recipient-id]').forEach(input=>{const parent=input.dataset.recipientParent;if(!parent){const children=recipientChildren(input.dataset.recipientId),selected=children.filter(x=>state.recipients.has(x.id)).length;input.indeterminate=!state.recipients.has(input.dataset.recipientId)&&selected>0&&selected<children.length}})}
function applyRecipientFilter(){const keyword=($('#recipient-search')?.value||'').trim().slice(0,50),type=$('#school-type-filter')?.value||'';state.recipientSearch=keyword;state.recipientSchoolType=type;let visibleGroups=0;$$('[data-recipient-group]').forEach(group=>{const parentName=group.dataset.name||'',rows=$$('[data-recipient-row]',group),parentMatch=parentName.includes(keyword),childMatch=rows.some(row=>(row.dataset.search||row.dataset.name||'').includes(keyword)),visible=!keyword||parentMatch||childMatch;group.classList.toggle('hidden',!visible);if(visible)visibleGroups++;rows.forEach(row=>row.classList.toggle('hidden',Boolean(keyword)&&!parentMatch&&!(row.dataset.search||row.dataset.name||'').includes(keyword)));const children=$('.recipient-children',group);children?.classList.toggle('search-expanded',Boolean(keyword)&&childMatch)});$$('[data-school-card]').forEach(card=>{const typeMatch=!type||card.dataset.schoolType===type,nameMatch=!keyword||(card.textContent||'').includes(keyword),visible=typeMatch&&nameMatch;card.classList.toggle('hidden',!visible);if(visible&&!card.matches('[data-recipient-group]'))visibleGroups++});const empty=$('.recipient-filter-empty');if(empty){empty.classList.toggle('hidden',visibleGroups>0);if(!visibleGroups&&keyword)recipientTrack('recipient_empty_result',{search_keyword:keyword})}const mobileAll=$('[data-mobile-recipient-all]');if(mobileAll&&departmentPersonMode()){const selectable=mobileSelectableRecipients();mobileAll.checked=Boolean(selectable.length)&&selectable.every(person=>state.recipients.has(person.personId||person.id))}if(keyword)recipientTrack('recipient_search',{search_keyword:keyword});syncRecipientParents()}
function resetCreationState(){state.step=1;state.draftTitle='';state.draftDescription='';state.draftSurveyTypeId='';state.editingSurveyId=null;state.questions=defaultQuestions();state.questionMenu=-1;state.questionError=-1;state.recipients.clear();state.recipientTab='';state.recipientReturnPage='';state.recipientExpansion.clear();state.recipientSearch='';state.recipientSchoolType='';state.externalRecipient=false;state.frequency='single';state.startDate=collectionDefaultDate();state.endDate=collectionDefaultDate(7);state.allowModify=false;state.dailyReminder=false;state.skipNonWorkday=false;state.reminderTime='';state.mobileSettingsSheet='';state.editingSurveyTemplateId=null}
function draftRecipientSnapshot(s){if(s.recipientSnapshot?.length)return s.recipientSnapshot;return s.total?[{id:`draft-target-${s.id}`,name:s.target||'已选接收范围',count:s.total,category:'legacy',level:'group'}]:[]}
function loadEditableSurveyState(s){resetCreationState();state.editingSurveyId=s.id;state.draftTitle=s.title||'';state.draftDescription=s.description||'请根据实际情况填写，本问卷数据仅用于相关工作分析。';state.draftSurveyTypeId=validSurveyTypeId(s.surveyTypeId)?s.surveyTypeId:'';state.questions=cloneQuestions(s.questions?.length?s.questions:defaultQuestions());Object.assign(state,normalizedCollectionSettings({frequency:s.frequency||'single',skipNonWorkday:s.skipNonWorkday,dailyReminder:s.dailyReminder,reminderTime:s.reminderTime}));state.startDate=s.startDate||collectionDefaultDate();state.endDate=s.endDate||collectionDefaultDate(7);state.allowModify=false;state.externalRecipient=Boolean(s.allowExternal||s.channel!=='internal');draftRecipientSnapshot(s).forEach(item=>{const id=item.personId||item.id;state.recipients.set(id,{...item,id})})}
function captureCreationInputs(){const title=$('#survey-title')||$('#mobile-title'),description=$('#survey-description')||$('#mobile-description'),surveyType=$('#survey-type')||$('#mobile-survey-type');if(title)state.draftTitle=title.value.trim();if(description)state.draftDescription=description.value.trim();if(surveyType)state.draftSurveyTypeId=surveyType.value;const external=$('#allow-external')||$('#mobile-allow-external'),start=$('#start-date')||$('#mobile-start-date'),end=$('#end-date')||$('#mobile-end-date'),reminder=$('#reminder-time')||$('#mobile-reminder-time');if(external)state.externalRecipient=external.checked;if(start)state.startDate=start.value;if(end)state.endDate=end.value;if(reminder)state.reminderTime=reminder.value}
function draftPayload(existing=null){const external=state.externalRecipient,total=recipientCount(),collection=normalizedCollectionSettings(state),selectedType=surveyTypeById(state.draftSurveyTypeId);return{title:state.draftTitle||existing?.title||'未命名问卷',description:state.draftDescription,surveyTypeId:selectedType?.id||'',surveyTypeName:selectedType?.name||'',channel:external?'public':'internal',allowExternal:external,target:recipientSummary()||existing?.target||'未选择',time:'未发布',startDate:state.startDate,endDate:state.endDate,internalDone:0,externalDone:0,done:0,total,recipientSnapshot:selectedRecipientSnapshot(),received:false,frequency:collection.frequency,allowModify:false,skipNonWorkday:collection.skipNonWorkday,dailyReminder:collection.dailyReminder,reminderTime:collection.reminderTime,questions:cloneQuestions(state.questions)}}
function saveDraftSurvey(){captureCreationInputs();if(!state.draftTitle){toast('请输入问卷标题');return}if(!validSurveyTypeId(state.draftSurveyTypeId)){state.step=1;renderShell();toast('请选择问卷类型');return}const questionError=firstQuestionError();if(showQuestionError(questionError))return;state.questions.forEach(q=>{if(['单选','多选'].includes(q.type))q.options=q.options.map(x=>x.trim()).filter(Boolean)});const c=CONFIG[state.portal],existing=state.editingSurveyId?c.surveys.find(s=>s.id===state.editingSurveyId&&s.status==='draft'):null,payload=draftPayload(existing);if(existing)Object.assign(existing,payload);else{const id=Date.now();c.surveys.unshift({id,...payload,owner:currentUserName(),createdAt:formatSystemTime(),deleted:0,status:'draft',statusText:'草稿'});state.editingSurveyId=id}toast('草稿已保存')}
function selectedRecipientSnapshot(){return [...state.recipients.values()].map(item=>item.level==='person'?{personId:item.personId,name:item.name,count:1,category:item.category||'department',level:'person',departmentId:item.departmentId,departmentName:item.departmentName,position:item.position,status:item.status}:{id:item.id,name:item.name,count:item.count,category:item.category,level:item.level})}
function draftValidationError(){if(!state.draftTitle.trim())return'请输入问卷标题';if(state.draftTitle.trim().length>50)return'问卷标题不能超过 50 个字符';if(!validSurveyTypeId(state.draftSurveyTypeId))return'请选择问卷类型';const questionError=firstQuestionError();if(questionError)return questionError.message;if(!state.recipients.size&&!state.externalRecipient)return'请选择接收人员或开启外部填写';if(!state.startDate||!state.endDate)return'请选择开始日期和截止日期';if(state.startDate>state.endDate)return'开始日期不能晚于截止日期';if(state.frequency==='daily'&&state.dailyReminder&&!state.reminderTime)return'请选择每日提醒时间';return''}
function publishDraft(source='pc'){
 captureCreationInputs();
 const c=CONFIG[state.portal],editing=Boolean(state.editingSurveyId),existing=editing?c.surveys.find(s=>s.id===state.editingSurveyId&&s.deleted!==1&&s.owner===currentUserName()):null;
 if(editing&&(!existing||!['draft','not_started'].includes(existing.status))){toast('问卷状态已变化，当前不可保存');return}
 if(existing?.status==='not_started'){syncSurveyTemporalStatus(existing);if(existing.status!=='not_started'){toast('问卷已开始，当前不可继续编辑');return}}
 const publishedEdit=existing?.status==='not_started',questionError=firstQuestionError(),error=draftValidationError();
 if(error){recipientTrack('recipient_publish_validation_failed',{source,error});if(questionError&&error===questionError.message){showQuestionError(questionError);return}toast(error);return}
 const id=existing?.id||Date.now(),external=state.externalRecipient,title=state.draftTitle||'新建问卷',payload=draftPayload(existing),daily=payload.frequency==='daily',dateRange=`${state.startDate.slice(5)} 至 ${state.endDate.slice(5)}`,time=daily&&payload.dailyReminder?`${dateRange} · 每日 ${payload.reminderTime}`:dateRange,publishScope=external&&recipientCount()===0?'外部人员':external?'已选内部人员及外部人员':'已选接收人员',finish=()=>{resetCreationState();if(source==='mobile'){state.page='mobile/templates';location.hash='mobile/templates'}else{state.listView='published';state.page='list';location.hash='list'}renderShell();toast(publishedEdit?'问卷修改已保存':'问卷发布成功')},confirmTitle=publishedEdit?'确认保存修改？':'确认发布问卷？',confirmText=publishedEdit?`保存后将按新的收集设置更新“${esc(title)}”，并重新计算问卷状态。`:`系统将向${publishScope}发布“${esc(title)}”，发布后产生答卷即锁定题目结构。`,confirmButton=publishedEdit?'确认保存':'确认发布';
 modal(confirmTitle,confirmText,confirmButton,()=>{
  if(publishedEdit){syncSurveyTemporalStatus(existing);if(existing.status!=='not_started'){toast('问卷已开始，修改未保存');return}}
  const finalRecipientError=recipientSelectionError();if(finalRecipientError){recipientTrack('recipient_publish_validation_failed',{source,error:finalRecipientError,phase:'confirm'});toast(finalRecipientError);return}
  const status=temporalStatusForDates(payload.startDate,payload.endDate),operational=publishedEdit?{done:existing.done||0,internalDone:existing.internalDone??0,externalDone:existing.externalDone??0,received:existing.received??false}:{},published={...payload,...operational,time,status,statusText:SURVEY_STATUS_TEXT[status],total:recipientCount(),recipientSnapshot:selectedRecipientSnapshot()};
  delete published.recipientSelections;delete published.recipientManualPartialScopes;
  let saved;if(existing){Object.assign(existing,published);delete existing.recipientSelections;delete existing.recipientManualPartialScopes;saved=existing}else{saved={id,...published,owner:currentUserName(),createdAt:formatSystemTime(),deleted:0};c.surveys.unshift(saved)}if(saved.status==='running'){syncSurveyRecipientAssignments(saved);syncDynamicSurveyRecipientTotal(saved)}
  if(publishedEdit)finish();else external?showExternalPublishResult(id,finish):finish()
 })
}
function loadSurveyTemplateContentState(item,editing=false){resetCreationState();state.editingSurveyTemplateId=editing?item.id:null;state.draftTitle=item.title||'';state.draftDescription=item.description||'';state.draftSurveyTypeId=validSurveyTypeId(item.surveyTypeId)?String(item.surveyTypeId):'';state.questions=cloneQuestions(item.questions)}
function loadSurveyTemplateState(item,editing=false){loadSurveyTemplateContentState(item,editing)}
function loadSurveyTemplateForCreation(item){
 loadSurveyTemplateContentState(item,false)
}
function surveyTemplateContentValue(existing){
 const title=state.draftTitle.trim(),summary=state.questions.map(q=>q.title.trim()).filter(Boolean).slice(0,4).join('、')||'暂无题目',selectedType=surveyTypeById(state.draftSurveyTypeId),value={id:existing?.id||`${state.portal}-survey-custom-${Date.now()}`,title,description:state.draftDescription.trim(),summary,surveyTypeId:selectedType?.id||'',questions:cloneQuestions(state.questions),creator:existing?.creator||currentUserName(),createdAt:existing?.createdAt||formatSystemTime(),source:existing?.source||'custom'};
 if(Number.isFinite(existing?.demoRank))value.demoRank=existing.demoRank;return value
}
function surveyTemplateValue(existing){return surveyTemplateContentValue(existing)}
function saveSurveyTemplate(){const list=surveyTemplateItems(),existingIndex=list.findIndex(x=>String(x.id)===String(state.editingSurveyTemplateId)),existing=existingIndex>=0?list[existingIndex]:null,title=state.draftTitle.trim();if(existing?.source==='system'){state.editingSurveyTemplateId=null;location.hash='templates';renderShell();toast('系统模板不可编辑');return}if(!title){toast('请输入模板名称');state.step=1;renderShell();return}if(title.length>50){toast('模板名称不能超过 50 个字符');state.step=1;renderShell();return}if(!validSurveyTypeId(state.draftSurveyTypeId)){toast('请选择问卷类型');state.step=1;renderShell();return}if(showQuestionError(firstQuestionError()))return;if(list.some((x,index)=>x.title===title&&index!==existingIndex)){toast('当前端已存在同名问卷模板');state.step=1;renderShell();return}state.questions.forEach(q=>{if(['单选','多选'].includes(q.type))q.options=q.options.map(x=>x.trim()).filter(Boolean)});const value=surveyTemplateContentValue(existing);if(existingIndex>=0)list.splice(existingIndex,1,value);else list.unshift(value);resetCreationState();location.hash='templates';renderShell();toast(existing?'问卷模板已更新':'问卷模板已创建')}
function deleteSurveyTemplate(id){const list=surveyTemplateItems(),item=list.find(x=>String(x.id)===String(id));if(!item)return;if(item.source==='system'){toast('系统模板不可删除');return}modal('删除问卷模板？',`删除“${esc(item.title)}”后无法恢复，已通过该模板创建的问卷不受影响。`,'确认删除',()=>{SURVEY_TEMPLATE_STORE[state.portal]=list.filter(x=>String(x.id)!==String(id));renderShell();toast('问卷模板已删除')})}
function externalQrPayload(s){const base=location.href?location.href.split('#')[0]:`${location.origin}${location.pathname}`;return `${base}#mobile/fill/${s.id}/external`}
function qrMatrix(value,size=25){let seed=2166136261,cells=Array(size*size).fill(false),reserved=Array(size*size).fill(false);for(const char of value){seed^=char.charCodeAt(0);seed=Math.imul(seed,16777619)>>>0}const set=(row,col,dark,lock=true)=>{if(row<0||col<0||row>=size||col>=size)return;cells[row*size+col]=dark;if(lock)reserved[row*size+col]=true},finder=(row,col)=>{for(let y=-1;y<=7;y++)for(let x=-1;x<=7;x++){const inside=x>=0&&x<=6&&y>=0&&y<=6,dark=inside&&(x===0||x===6||y===0||y===6||(x>=2&&x<=4&&y>=2&&y<=4));set(row+y,col+x,dark)}};finder(0,0);finder(0,size-7);finder(size-7,0);for(let i=8;i<size-8;i++){set(6,i,i%2===0);set(i,6,i%2===0)}set(size-8,8,true);for(let row=0;row<size;row++)for(let col=0;col<size;col++){const index=row*size+col;if(reserved[index])continue;seed=(Math.imul(seed,1664525)+1013904223)>>>0;cells[index]=Boolean((seed>>>30)^((row+col)%3===0))}return{size,cells}}
function qrMarkup(qr){return `<div class="demo-qr" style="--qr-size:${qr.size}" aria-label="问卷填写二维码">${qr.cells.map(dark=>`<i class="${dark?'on':''}"></i>`).join('')}</div>`}
function downloadQr(qr,filename){const unit=10,quiet=4,canvas=document.createElement('canvas'),size=(qr.size+quiet*2)*unit;canvas.width=size;canvas.height=size;const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,size,size);context.fillStyle='#182b3c';qr.cells.forEach((dark,index)=>{if(!dark)return;const row=Math.floor(index/qr.size),col=index%qr.size;context.fillRect((col+quiet)*unit,(row+quiet)*unit,unit,unit)});const save=url=>{const link=document.createElement('a');link.href=url;link.download=`${filename.replace(/[\\/:*?"<>|]/g,'_')}-二维码.png`;link.click();if(url.startsWith('blob:'))URL.revokeObjectURL(url)};canvas.toBlob?canvas.toBlob(blob=>blob&&save(URL.createObjectURL(blob))):save(canvas.toDataURL('image/png'))}
function qrScanPreviewMarkup(s){const available=s.status==='running';return `<div class="qr-scan-layer"><button class="qr-scan-close" data-close-qr-preview aria-label="关闭扫码实例">×</button><section class="qr-phone-shell"><header class="wechat-scan-head"><button data-close-qr-preview aria-label="返回">‹</button><b>问卷填写</b><span>•••</span></header><div class="qr-phone-screen">${available?mobileFormContent(s,false,true):`<div class="qr-scan-unavailable"><i>!</i><b>问卷${esc(s.statusText)}</b><span>当前问卷暂不可填写，请联系问卷发布人。</span></div>`}</div></section></div>`}
function openQrScanPreview(s,m){
 syncSurveyTemporalStatus(s);
 m.insertAdjacentHTML('beforeend',qrScanPreviewMarkup(s));
 const layer=$('.qr-scan-layer',m),close=()=>{closePrd('route_change');layer?.remove()};
 decorateOverlay($('.qr-phone-shell',layer),'qr-preview');
 $$('[data-close-qr-preview]',layer).forEach(button=>button.onclick=close);
 $$('[data-location-picker-open]',layer).forEach(button=>button.onclick=()=>openMobileLocationPicker(button.dataset.locationPickerOpen,button.dataset.locationPickerMode));
 $('[data-qr-preview-submit]',layer)?.addEventListener('click',()=>{
  const current=CONFIG[state.portal].surveys.find(item=>item.id===s.id&&item.deleted!==1);
  syncSurveyTemporalStatus(current);
  const allowed=Boolean(current&&current.status==='running'&&(current.allowExternal===true||current.channel!=='internal'));
  if(!allowed){const screen=$('.qr-phone-screen',layer);if(screen&&current)screen.innerHTML=`<div class="qr-scan-unavailable"><i>!</i><b>问卷${esc(current.statusText)}</b><span>当前问卷暂不可填写，请联系问卷发布人。</span></div>`;toast(current?.status==='not_started'?'问卷尚未开始':'当前问卷不可提交');return}
  toast('扫码实例提交成功（演示）')
 });
 layer.onclick=e=>{if(e.target===layer)close()}
}
function openSurveyQr(s,finish=null,publishSuccess=false){syncSurveyTemporalStatus(s);const payload=externalQrPayload(s),qr=qrMatrix(payload),m=$('#modal'),available=s.status==='running',close=()=>{closePrd('route_change');m.classList.remove('show','qr-modal-mask','stats-confirm-mask');m.innerHTML=''};m.classList.remove('stats-confirm-mask');m.classList.add('qr-modal-mask');m.innerHTML=`<div class="modal external-result qr-result"><div class="qr-modal-head"><h3>${publishSuccess?'问卷发布成功':'问卷填写二维码'}</h3><div class="qr-modal-tools">${prdButton('qr','overlay','overlay-prd-trigger')}<button class="btn sm qr-demo-btn" id="open-scan-demo">扫码实例</button></div></div><p>${available?'外部人员可扫描二维码填写问卷。':'该问卷当前为“'+esc(s.statusText)+'”，二维码保留但暂不可提交。'}</p><div class="qr-survey-name">${esc(s.title)}</div>${qrMarkup(qr)}<div class="modal-actions"><button class="btn" id="download-survey-qr">下载二维码</button><button class="btn primary" id="finish-publish">${publishSuccess?'完成':'关闭'}</button></div></div>`;m.classList.add('show');decorateOverlay($('.qr-result',m),'qr');$('#open-scan-demo').onclick=()=>openQrScanPreview(s,m);$('#download-survey-qr').onclick=()=>{downloadQr(qr,s.title);toast('二维码已下载')};$('#finish-publish').onclick=()=>{close();finish&&finish()};m.onclick=e=>{if(e.target===m&&!publishSuccess)close()}}
function showExternalPublishResult(id,finish){const survey=CONFIG[state.portal].surveys.find(item=>item.id===id);openSurveyQr(survey,finish,true)}
function statsMobileMenuButton(s){return s&&s.deleted!==1&&s.owner===currentUserName()?`<button class="stats-more-button" type="button" data-stats-more="${s.id}" aria-label="更多操作">...</button>`:''}
function openStatsActionSheet(s){
 const stage=$('.device-stage');
 if(!stage||!s||s.deleted===1||s.owner!==currentUserName()){toast('无权操作该问卷');return}
 syncSurveyTemporalStatus(s);$('.stats-action-mask',stage)?.remove();
 const m=document.createElement('div'),external=s.status!=='draft'&&(s.allowExternal===true||s.channel!=='internal'),statusActions=s.status==='running'?'<button type="button" data-sheet-action="pause">暂停</button><button type="button" class="danger" data-sheet-action="end">结束</button>':s.status==='paused'?'<button type="button" data-sheet-action="resume">恢复</button><button type="button" class="danger" data-sheet-action="end">结束</button>':s.status==='not_started'?'<button type="button" class="danger" data-sheet-action="end">结束</button>':'',deleteAction=s.status==='paused'&&canDeleteSurvey(s)?'<button type="button" class="danger" data-sheet-action="delete">删除</button>':'';
 m.className='stats-action-mask';m.innerHTML=`<section class="stats-action-sheet" role="dialog" aria-modal="true" aria-label="问卷操作"><header><h3>更多操作</h3><button type="button" class="stats-action-close" aria-label="关闭">×</button></header><div class="stats-action-list">${external?'<button type="button" data-sheet-action="qr">二维码</button>':''}${statusActions}${deleteAction}</div><button type="button" class="stats-action-cancel">取消</button></section>`;stage.appendChild(m);
 const close=()=>m.remove();$('.stats-action-close',m).onclick=close;$('.stats-action-cancel',m).onclick=close;m.onclick=e=>{if(e.target===m)close()};
 $$('[data-sheet-action]',m).forEach(button=>button.onclick=()=>{const action=button.dataset.sheetAction;close();if(s.deleted===1||s.owner!==currentUserName()){toast('问卷状态或权限已变化');return}syncSurveyTemporalStatus(s);if(action==='qr'){openSurveyQr(s);return}if(action==='pause'||action==='resume'){const resumed=temporalStatusForDates(s.startDate,s.endDate),next=action==='pause'?['暂停问卷？','paused','已暂停']:['恢复问卷？',resumed,SURVEY_STATUS_TEXT[resumed]];modal(next[0],`操作后将立即更新“${esc(s.title)}”的问卷状态。`,'确认',()=>{if(s.deleted===1||s.owner!==currentUserName()){toast('问卷状态或权限已变化');return}s.status=next[1];s.statusText=next[2];renderShell();toast('状态已更新')},'stats-confirm-mask');return}if(action==='end'){modal('提前结束问卷？',`结束后“${esc(s.title)}”将无法继续提交。`,'确认结束',()=>{if(s.deleted===1||s.owner!==currentUserName()){toast('问卷状态或权限已变化');return}s.status='ended';s.statusText='已结束';renderShell();toast('状态已更新')},'stats-confirm-mask');return}if(action!=='delete'||!canDeleteSurvey(s))return;modal('删除问卷？',`删除“${esc(s.title)}”后，该问卷将从我的问卷、问卷管理和统计列表中移除。`,'确认删除',()=>{syncSurveyTemporalStatus(s);if(!canDeleteSurvey(s)){toast('问卷状态或权限已变化，无法删除');return}s.deleted=1;state.page='stats';location.hash='stats';renderShell();toast('问卷已删除')},'stats-confirm-mask')});
}
function templatesPage(){return surveyTemplatesPage()}
function surveyTemplatePageData(){const f=state.templateFilters,typeOptions=[['all','全部'],...currentSurveyTypes().map(item=>[String(item.id),item.name])],items=demoSort(surveyTemplateItems().filter(item=>String(item.title||'').includes(f.name.trim())&&(f.type==='all'||String(item.surveyTypeId)===String(f.type)))),page=paginateItems('templates',items);state.templateTypeFilter=f.type;return{f,typeOptions,page}}
function surveyTemplateFilterMarkup(f,typeOptions,total){return `<div class="filter-card"><div class="toolbar filter-toolbar"><label class="filter-item"><span>模板名称：</span><input id="template-name" type="text" maxlength="50" value="${esc(f.name)}" placeholder="请输入模板名称"></label><label class="filter-item"><span>问卷类型：</span><select id="template-type" class="select">${filterOptions(typeOptions,f.type)}</select></label></div><span class="subtle">共 ${total} 条记录</span></div>`}
function surveyTemplateTableMarkup(page,selecting=false){return `<div class="table-wrap template-table-wrap"><table class="data-table template-table"><thead><tr><th>序号</th><th>模板名称</th><th>问卷类型</th><th>模板内容</th><th>创建人</th><th>创建时间</th><th>操作</th></tr></thead><tbody>${page.items.length?page.items.map((x,i)=>`<tr data-template-name="${esc(x.title)}" data-template-type="${esc(x.surveyTypeId)}" data-survey-template-id="${esc(x.id)}"><td class="template-index">${page.start+i+1}</td><td><div class="title-cell">${esc(x.title)}</div></td><td>${esc(surveyTypeName(x.surveyTypeId))}</td><td>${esc(x.summary)}</td><td>${esc(x.creator)}</td><td class="nowrap">${esc(x.createdAt)}</td><td><div class="row-actions template-row-actions"><button class="link-btn" data-action="use-template" data-template-id="${esc(x.id)}">${selecting?'使用此模板':'使用模板'}</button>${selecting||x.source==='system'?'':'<button class="link-btn" data-action="edit-survey-template">编辑</button><button class="link-btn danger" data-action="delete-survey-template">删除</button>'}</div></td></tr>`).join(''):'<tr><td colspan="7"><div class="empty-state"><b>未找到符合条件的模板</b><span>请调整筛选条件后重试</span></div></td></tr>'}</tbody></table>${paginationComponent('templates',page.totalPages,page.page,page.total)}</div>`}
function templateSelectionModalData(){const f=state.templateSelectFilters,types=currentSurveyTypes();if(f.type!=='all'&&!types.some(item=>String(item.id)===String(f.type)))f.type='all';const typeOptions=[['all','全部'],...types.map(item=>[String(item.id),item.name])],keyword=f.name.trim(),items=demoSort(surveyTemplateItems().filter(item=>String(item.title||'').includes(keyword)&&(f.type==='all'||String(item.surveyTypeId)===String(f.type)))),page=paginateItems('template-select-modal',items);return{f,typeOptions,page}}
function templateSelectionModalMarkup(){const {f,typeOptions,page}=templateSelectionModalData();return `<div class="template-select-mask" data-template-select-mask><section class="template-select-modal" role="dialog" aria-modal="true" aria-labelledby="template-select-title"><header class="template-select-head"><div><h2 id="template-select-title">选择问卷模板</h2><p>选择系统模板或自定义模板快速创建问卷</p></div><button type="button" class="template-select-close" data-template-select-close aria-label="关闭模板选择弹窗">×</button></header><div class="template-select-filters"><label><span>模板名称：</span><input id="template-select-name" type="text" maxlength="50" value="${esc(f.name)}" placeholder="请输入模板名称"></label><label><span>问卷类型：</span><select id="template-select-type" class="select">${filterOptions(typeOptions,f.type)}</select></label><em>共 ${page.total} 条记录</em></div><div class="template-select-body"><div class="table-wrap template-select-table-wrap"><table class="data-table template-select-table"><thead><tr><th class="index-col">序号</th><th>模板名称</th><th>问卷类型</th><th>创建时间</th></tr></thead><tbody>${page.items.length?page.items.map((template,index)=>`<tr role="button" tabindex="0" data-template-pick="${esc(template.id)}" aria-label="使用模板：${esc(template.title)}"><td class="index-col">${page.start+index+1}</td><td><div class="title-cell">${esc(template.title)}</div></td><td class="template-select-intro">${esc(surveyTypeName(template.surveyTypeId))}</td><td class="nowrap">${esc(template.createdAt)}</td></tr>`).join(''):'<tr><td colspan="4"><div class="empty-state"><b>未找到符合条件的模板</b><span>请调整模板名称或问卷类型后重试</span></div></td></tr>'}</tbody></table>${paginationComponent('template-select-modal',page.totalPages,page.page,page.total)}</div></div></section></div>`}
function openTemplateSelectionModal(){state.createSurveyMenuOpen=false;state.templateSelectOpen=true;state.templateSelectFilters={name:'',type:'all'};resetPagination('template-select-modal');renderShell();setTimeout(()=>$('#template-select-name')?.focus(),0)}
function closeTemplateSelectionModal(){if(!state.templateSelectOpen)return;state.templateSelectOpen=false;renderShell();setTimeout(()=>$('[data-create-survey-menu-toggle]')?.focus(),0)}
function selectTemplateForCreation(templateId){const template=surveyTemplateItems().find(item=>String(item.id)===String(templateId));if(!template){toast('该模板不存在或已被删除，请重新选择');renderShell();return}if(!validSurveyTypeId(template.surveyTypeId)){toast('模板关联的问卷类型已失效，请选择其他模板');return}loadSurveyTemplateForCreation(template);state.step=1;state.templateSelectOpen=false;location.hash='list/create';toast('模板已应用，请确认基础信息')}
if(!window.__templateSelectEscapeBound){window.__templateSelectEscapeBound=true;document.addEventListener('keydown',event=>{if(event.key!=='Escape'||!state.templateSelectOpen||$('#prd-layer')?.classList.contains('show'))return;event.preventDefault();event.stopImmediatePropagation();closeTemplateSelectionModal()})}
function surveyTemplatesPage(){const {f,typeOptions,page}=surveyTemplatePageData();return `${pageHead('模板中心','', '<button class="btn primary" data-action="add-survey-template">+ 新增问卷模板</button>')}${surveyTemplateFilterMarkup(f,typeOptions,page.total)}${surveyTemplateTableMarkup(page)}`}
function surveyTemplateSelectionPage(){if(state.preview==='pc'){if(!state.templateSelectOpen){state.templateSelectFilters={name:'',type:'all'};resetPagination('template-select-modal')}state.templateSelectOpen=true;state.page='list';history.replaceState(null,'','#list');return listPage()}return mobileTemplatesPage()}
function statsSurveys(){return demoSort(CONFIG[state.portal].surveys.filter(s=>s.deleted!==1&&s.status!=='draft'&&(s.owner===currentUserName()||submittedCount(s)>0)))}
function statsSurvey(){const id=Number(state.page.split('/')[2]);if(id)return CONFIG[state.portal].surveys.find(s=>s.id===id&&s.deleted!==1&&s.status!=='draft');return statsSurveys()[0]}
function statsMobileHead(title,back='#stats',actions=''){return `<div class="stats-mobile-head"><a href="${back}" aria-label="返回">‹</a><b>${title}</b>${actions||'<i></i>'}</div>`}
function mobileTabs(active){return `<nav class="mobile-main-tabs"><a class="${active==='fill'?'active':''}" href="#mobile/fill">填写</a><a class="${active==='stats'?'active':''}" href="#stats">统计</a><a class="${active==='create'?'active':''}" href="#mobile/templates">新建</a></nav>`}
function mobileRoutePage(){const p=state.page.split('/');if(p[1]==='complete'&&p[2])return mobileCompletePage(+p[2]);if(p[1]==='fill'&&p[2])return mobileFormPage(+p[2],p[3]==='view',p[3]==='external');if(p[1]==='templates')return mobileTemplatesPage();if(p[1]==='create')return mobileCreatePage();if(p[1]==='settings')return mobileSettingsPage();if(p[1]==='recipients')return mobileRecipientsPage();return mobileFillListPage()}
function mobileReceived(){return CONFIG[state.portal].surveys.filter(isReceivedSurveyVisible)}
function mobileFillListPage(){let rows=mobileReceived();if(state.mobileFilter==='done')rows=rows.filter(s=>fillStatusKey(s)==='submitted');if(state.mobileFilter==='todo')rows=rows.filter(s=>fillStatusKey(s)==='not_started');rows=demoSort(rows);const key=`mobile-fill:${state.mobileFilter}`,page=paginateItems(key,rows);return `${statsMobileHead('填写','#list')}${mobileTabs('fill')}<div class="mobile-filter">${[['all','全部'],['done','已填写'],['todo','未填写']].map(x=>`<button class="${state.mobileFilter===x[0]?'active':''}" data-mobile-filter="${x[0]}">${x[1]}</button>`).join('')}</div><div class="mobile-survey-list">${page.items.length?page.items.map(s=>{const submitted=fillStatusKey(s)==='submitted';return `<button class="mobile-survey-item" data-mobile-survey="${s.id}" data-mobile-view="${submitted?'view':'edit'}"><i class="${submitted?'done':'todo'}">${submitted?'✓':'✎'}</i><span><b>${esc(s.title)}</b><em>${esc(s.statusText)} · ${fillStatusLabel(s)}</em><small>发起人：${esc(s.owner)}</small></span><strong>›</strong></button>`}).join(''):'<div class="mobile-unavailable"><b>暂无符合条件的问卷</b><span>请切换填写状态后查看</span></div>'}</div>${paginationComponent(key,page.totalPages,page.page,page.total)}<div class="stats-list-end">共 ${page.total} 条记录</div>`}
function mobileSurvey(id){return CONFIG[state.portal].surveys.find(s=>s.id===id)||mobileReceived()[0]}
function mobileFormContent(s,readonly=false,preview=false,answerOverride=null){const answers=answerOverride??state.mobileAnswers[s.id]??[];return `<div class="mobile-form-intro"><h1>${esc(s.title)}</h1><p>${esc(s.description||'请如实填写')}</p></div><div class="mobile-dynamic-form">${surveyAnswerFields(s,answers,readonly,true)}</div><div class="mobile-form-actions">${readonly?`<span class="mobile-response-readonly">已提交，仅支持查看</span><a href="#stats/detail/${s.id}">查看此问卷统计 &gt;</a>`:preview?'<button data-qr-preview-submit>提交</button>':`<button data-action="mobile-submit" data-survey-id="${s.id}">提交</button>`}</div>`}
function mobileFormPage(id,view=false,external=false){const s=CONFIG[state.portal].surveys.find(item=>item.id===id&&item.deleted!==1),externalAllowed=Boolean(s&&external&&(s.allowExternal||s.channel==='public'));if(!s||external&&!externalAllowed||!external&&!isReceivedSurveyVisible(s))return `${statsMobileHead('填写','#mobile/fill')}<div class="mobile-unavailable"><i>!</i><b>问卷暂不可访问</b><span>该问卷尚未开始、已移除或不在您的接收范围内。</span></div>`;syncSurveyTemporalStatus(s);const records=external?[]:currentPersonResponseRecords(s),readonly=!external&&s.fillStatus==='submitted',record=readonly?records[0]:null;if(!readonly&&s.status!=='running')return `${statsMobileHead('填写','#mobile/fill')}<div class="mobile-unavailable"><i>!</i><b>问卷${esc(s.statusText)}</b><span>${s.status==='not_started'?`该问卷将于 ${esc(s.startDate)} 开始，请在开始后填写。`:'当前问卷暂不可填写，请联系问卷发布人。'}</span></div>`;if(!external&&!readonly&&!surveyAllowsCurrentPerson(s))return `${statsMobileHead('填写','#mobile/fill')}<div class="mobile-unavailable"><i>!</i><b>当前不可填写</b><span>您当前已不在问卷接收范围内，历史答卷仍可查看。</span></div>`;return `${statsMobileHead('填写','#mobile/fill')}${mobileFormContent(s,readonly,false,record?.answers||null)}`}
function mobileCompletePage(id){const s=mobileSurvey(id);return `${statsMobileHead('完成','#mobile/fill')}<section class="mobile-complete"><div class="mobile-complete-state"><i>✓</i><h1>上报已提交</h1><a href="#mobile/fill/${s.id}/view">查看提交</a></div></section>`}
function templatePreview(fields){return fields.split('、').map((x,i)=>`<div><b>${String(i+1).padStart(2,'0')}.</b>${x}<small>${i?'○ 选项一　○ 选项二':'请输入'}</small></div>`).join('')}
function mobileTemplatesPage(){const types=currentSurveyTypes();if(state.mobileTemplateType!=='all'&&!types.some(x=>String(x.id)===String(state.mobileTemplateType)))state.mobileTemplateType='all';const selected=types.find(x=>String(x.id)===String(state.mobileTemplateType)),items=demoSort(surveyTemplateItems().filter(x=>state.mobileTemplateType==='all'||String(x.surveyTypeId)===String(state.mobileTemplateType))),options=[{id:'all',name:'全部问卷类型'},...types],key=`mobile-templates:${state.mobileTemplateType}`,page=paginateItems(key,items);return `${statsMobileHead('新建','#mobile/fill')}${mobileTabs('create')}<div class="mobile-template-category"><span>请选择新建分类</span><div class="mobile-template-picker"><button type="button" class="mobile-template-picker-toggle" data-mobile-template-type-toggle aria-haspopup="listbox" aria-expanded="${state.mobileTemplateTypeOpen}"><b>${esc(selected?.name||'全部问卷类型')}</b><i aria-hidden="true">▼</i></button>${state.mobileTemplateTypeOpen?`<div class="mobile-template-options" role="listbox" aria-label="问卷类型">${options.map(x=>{const active=String(state.mobileTemplateType)===String(x.id);return `<button type="button" role="option" aria-selected="${active}" class="${active?'active':''}" data-mobile-template-type="${x.id}"><span>${esc(x.name)}</span><b aria-hidden="true">${active?'✓':''}</b></button>`}).join('')}</div>`:''}</div></div><div class="mobile-template-grid"><button class="mobile-template-new" data-mobile-new><strong>＋</strong></button><h3>自定义创建</h3>${page.items.length?page.items.map(x=>`<button class="mobile-template-card" data-mobile-template-id="${esc(x.id)}">${templatePreview(x.summary)}</button><h3>${esc(x.title)}</h3>`).join(''):`<div class="mobile-template-empty"><b>该类型暂无问卷模板</b><span>可使用“自定义创建”自行设计问卷</span></div>`}</div>${paginationComponent(key,page.totalPages,page.page,page.total)}<div class="stats-list-end">共 ${page.total} 个模板</div>`}
function mobileCreatePage(){return `${statsMobileHead('创建问卷','#mobile/templates')}${mobileTabs('fill')}<main class="mobile-create-page"><section class="mobile-create-info"><input id="mobile-title" maxlength="50" value="${esc(state.draftTitle)}" placeholder="无标题上报表"><label class="mobile-create-type"><span class="required">问卷类型</span><select id="mobile-survey-type" aria-label="问卷类型">${surveyTypeOptions(state.draftSurveyTypeId)}</select></label><textarea id="mobile-description" maxlength="500" placeholder="点击添加填写描述">${esc(state.draftDescription)}</textarea></section><div class="mobile-created-questions inline-question-list" id="questions">${state.questions.map((q,i)=>questionCard(q,i)).join('')}</div><div class="mobile-create-actions"><button class="mobile-add-question" data-mobile-picker>＋ 添加问题</button><button class="mobile-next" data-action="mobile-next-settings">下一步</button></div></main>${state.mobileQuestionPicker?mobileQuestionSheet():''}`}
function mobileQuestionSheet(){return `<div class="mobile-sheet-mask"><section class="mobile-question-sheet"><button class="sheet-close" data-mobile-picker-close>×</button><h2>添加问题</h2><details open><summary>常用问题</summary>${Object.entries(COMMON_QUESTIONS).map(([k,q])=>`<button data-mobile-common="${k}">${q.title}</button>`).join('')}</details><details><summary>自定义问题</summary>${['填空','单选','多选','日期','文件/图片','签名','位置'].map(x=>`<button data-mobile-type="${x}">${x}</button>`).join('')}</details><button class="sheet-confirm" data-mobile-picker-confirm>确定</button></section></div>`}
function frequencyLabel(value=state.frequency){return COLLECTION_FREQUENCIES.find(x=>x.value===value)?.label||COLLECTION_FREQUENCIES[0].label}
function mobileSettingsChoiceSheet(){const options=COLLECTION_FREQUENCIES;return `<div class="mobile-sheet-mask" data-mobile-settings-close><section class="mobile-choice-sheet" role="dialog" aria-modal="true" aria-label="选择收集方式"><header><h2>收集方式</h2><button type="button" data-mobile-settings-close aria-label="关闭">×</button></header>${options.map(x=>{const active=state.frequency===x.value;return `<button type="button" class="mobile-choice-option ${active?'active':''}" data-mobile-frequency="${x.value}"><span><b>${x.label}</b><small>${x.description}</small></span><i>${active?'✓':''}</i></button>`}).join('')}</section></div>`}
function mobileSettingsPage(){const daily=applyCollectionSettings(state).frequency==='daily',dailySettings=daily?`<label class="mobile-daily-setting"><span>非工作日不收集</span><input type="checkbox" id="mobile-skip" ${state.skipNonWorkday?'checked':''}></label><label class="mobile-daily-setting"><span>每日收集提醒</span><input type="checkbox" id="mobile-remind" ${state.dailyReminder?'checked':''}></label>${state.dailyReminder?`<label class="mobile-settings-value mobile-daily-setting"><span>提醒时间</span><input id="mobile-reminder-time" type="time" value="${state.reminderTime}"></label>`:''}`:'';return `${statsMobileHead('收集设置','#mobile/recipients')}<section class="mobile-settings"><label><span>是否允许外部人员填写</span><input type="checkbox" id="mobile-allow-external" ${state.externalRecipient?'checked':''}></label><p class="mobile-external-note">外部人员可以通过微信扫描二维码进行填写</p><button data-mobile-settings-sheet="frequency"><span>收集方式</span><em>${frequencyLabel()}　›</em></button><label class="mobile-settings-value"><span>开始日期</span><input id="mobile-start-date" type="date" value="${state.startDate}"></label><label class="mobile-settings-value"><span>截止日期</span><input id="mobile-end-date" type="date" value="${state.endDate}"></label>${dailySettings}</section><button class="mobile-next mobile-settings-confirm" data-action="mobile-publish">确定</button>${state.mobileSettingsSheet?mobileSettingsChoiceSheet():''}`}
function mobileRecipientTabs(){return state.portal==='bureau'?[['department','部门'],['school','学校']]:[['department','部门'],['parent','家长'],['class','班级']]}
function mobileRecipientGroups(){if(state.portal==='bureau'&&state.recipientTab==='school'){const count=SCHOOL_ROLES.reduce((sum,item)=>sum+item[2],0);return RECIPIENT_DATA.bureau.school.map(item=>({...item,count}))}return RECIPIENT_DATA[state.portal][state.recipientTab]||[]}
function mobileRecipientTree(){if(departmentPersonMode())return departmentPersonContent(true);return mobileRecipientGroups().map(group=>{const open=recipientExpanded(group.id,false),children=recipientChildren(group.id),selected=state.recipients.has(group.id);return `<article class="mobile-recipient-group ${open?'open':''}" data-recipient-group data-name="${esc(group.name)}" ${group.type?`data-school-card data-school-type="${esc(group.type)}"`:''}><div class="mobile-recipient-row"><label data-recipient-row data-name="${esc(group.name)}" data-search="${esc(group.name)}"><input type="checkbox" data-recipient-id="${group.id}" data-recipient-name="${esc(group.name)}" data-recipient-count="${group.count}" ${selected?'checked':''}><span>${esc(group.name)}${group.type?`<small>${esc(group.type)}</small>`:''}</span></label>${children.length?`<button type="button" data-toggle-recipient-node="${group.id}">${open?'收起':'下级'}　›</button>`:''}</div>${children.length?`<div class="mobile-recipient-children recipient-children ${open?'show':''}" data-recipient-children="${group.id}">${children.map(child=>`<label class="mobile-recipient-child" data-recipient-row data-name="${esc(child.name)}" data-search="${esc(child.name)}"><input type="checkbox" data-recipient-id="${child.id}" data-recipient-parent="${group.id}" data-recipient-name="${esc(child.name)}" data-recipient-count="${child.count}" ${state.recipients.has(child.id)||selected?'checked':''}><span>${esc(child.name)}</span><em>${child.count}人</em></label>`).join('')}</div>`:''}</article>`}).join('')}
function mobileSelectableRecipients(){if(!departmentPersonMode())return mobileRecipientGroups();const keyword=state.recipientSearch.trim(),people=new Map();DEPARTMENT_PEOPLE[state.portal].forEach(group=>{const departmentMatch=group.name.includes(keyword);recipientChildren(group.id).forEach(person=>{const match=!keyword||departmentMatch||[person.name,person.departmentName].join(' ').includes(keyword);if(match&&!people.has(person.personId))people.set(person.personId,person)})});return [...people.values()]}
function mobileRecipientsPage(){const tabs=mobileRecipientTabs();if(!tabs.some(x=>x[0]===state.recipientTab))state.recipientTab=tabs[0][0];const selectable=mobileSelectableRecipients(),allSelected=selectable.length&&selectable.every(x=>state.recipients.has(x.personId||x.id)),personMode=departmentPersonMode(),kind=personMode?'姓名或部门':recipientTabMeta()[state.recipientTab]?.[0]||'成员';return `${statsMobileHead('选择成员','#mobile/create')}<section class="mobile-recipient-page"><nav class="mobile-recipient-tabs ${tabs.length===2?'two-tabs':''}">${tabs.map(tab=>`<button type="button" class="${state.recipientTab===tab[0]?'active':''}" data-recipient-tab="${tab[0]}">${tab[1]}</button>`).join('')}</nav><div class="mobile-recipient-search"><input id="recipient-search" maxlength="50" value="${esc(state.recipientSearch)}" placeholder="请输入${kind}"></div>${state.portal==='bureau'&&state.recipientTab==='school'?`<select id="school-type-filter" class="mobile-school-filter"><option value="">全部学校类型</option>${['小学','初中','九年一贯制'].map(x=>`<option ${state.recipientSchoolType===x?'selected':''}>${x}</option>`).join('')}</select>`:''}<div class="mobile-recipient-breadcrumb">全部　›</div><label class="mobile-recipient-select-all"><input type="checkbox" data-mobile-recipient-all ${allSelected?'checked':''}><span>${personMode?'全选当前结果':'全选'}</span></label><div class="mobile-recipient-list">${mobileRecipientTree()}<div class="recipient-filter-empty hidden"><b>未找到符合条件的人员</b><span>请调整姓名或部门关键词</span></div></div></section><footer class="mobile-recipient-footer"><div><b>已选 ${state.recipients.size} ${personMode?'人':'项'}</b><span>预计 ${recipientCount()} 人</span></div><a href="#mobile/settings" data-mobile-recipient-confirm>下一步</a></footer>`}
const STATS_TIPS=Object.freeze({submitted:'仅统计内部接收人员的有效提交人数，不包含外部人员提交。',pending:'仅统计内部接收人员中尚未提交的人数，不包含外部人员。',external:'统计外部人员通过微信扫描二维码提交的有效问卷份数。',rate:'完成率 = 已提交 ÷（已提交 + 未提交），不计算外部提交数。'});
function hasStatsTask(s){return !isDailySurvey(s)||availableStatsDates(s).length>0}
function statsPage(){
 const rows=statsSurveys(),page=paginateItems('stats',rows),mobile=state.preview==='mobile';
 return `${statsMobileHead('教育问卷调研','#mobile/fill')}${mobileTabs('stats')}${pageHead(state.portal==='school'?'校内统计':'区域统计',mobile?'查看问卷提交进度、填写明细与题目数据。':'查看问卷提交进度、收集明细与题目数据。')}<div class="stats-list">${page.items.length?page.items.map(s=>{const snapshot=statsSnapshot(s),trackable=snapshot.total>0,available=s.status==='not_started'||hasStatsTask(s),submitted=available&&trackable?`<button data-detail-kind="submitted" data-survey-id="${s.id}"><strong>${snapshot.internalDone}</strong><span>已提交 ${infoTip(STATS_TIPS.submitted,'已提交')}</span></button>`:`<div class="stats-metric untrackable"><strong>${available?'0':'—'}</strong><span>${available?'已提交':'暂无任务'} ${available?infoTip(STATS_TIPS.submitted,'已提交'):''}</span></div>`,pending=available&&trackable?`<button class="pending" data-detail-kind="pending" data-survey-id="${s.id}"><strong>${snapshot.pending}</strong><span>未提交 ${infoTip(STATS_TIPS.pending,'未提交')}</span></button>`:`<div class="stats-metric pending untrackable"><strong>—</strong><span>${available?'未提交':'暂无任务'} ${available?infoTip(STATS_TIPS.pending,'未提交'):''}</span></div>`,external=available?`<div class="stats-metric external" data-stats-static><strong>${snapshot.externalDone}</strong><span>外部提交数 ${infoTip(STATS_TIPS.external,'外部提交数')}</span></div>`:`<div class="stats-metric external untrackable"><strong>—</strong><span>外部提交数</span></div>`;return `<article class="stats-survey-card ${available?'':'is-unavailable'}" ${available?`data-stats-open="${s.id}" tabindex="0"`:'aria-disabled="true"'}><div><h3>${esc(s.title)}</h3><p><span class="tag ${s.status}">${s.statusText}</span> · ${available?`创建于${s.createdAt.slice(5,10).replace('-','月')}日`:'暂无可统计任务日期'}</p></div><div class="stats-card-numbers">${submitted}${pending}${external}</div></article>`}).join(''):'<div class="mobile-unavailable"><b>暂无统计数据</b><span>我发布的未开始及已有提交问卷将在此展示</span></div>'}</div>${paginationComponent('stats',page.totalPages,page.page,page.total)}<div class="stats-list-end">共 ${page.total} 份问卷</div>`;
}
function statsSummaryCards(s,snapshot,mobile=state.preview==='mobile'){
 const submittedTip=infoTip(STATS_TIPS.submitted,'已提交'),pendingTip=infoTip(STATS_TIPS.pending,'未提交'),externalTip=infoTip(STATS_TIPS.external,'外部提交数'),rateTip=infoTip(STATS_TIPS.rate,'完成率'),trackable=snapshot.total>0;
 if(mobile){
  const submitted=trackable?`<button class="submitted" data-detail-kind="submitted" data-survey-id="${s.id}"><strong>${snapshot.internalDone}</strong><span>已提交 ${submittedTip}</span><em>查看明细</em></button>`:`<div class="submitted stats-metric untrackable"><strong>0</strong><span>已提交 ${submittedTip}</span></div>`;
  const pending=trackable?`<button class="pending" data-detail-kind="pending" data-survey-id="${s.id}"><strong>${snapshot.pending}</strong><span>未提交 ${pendingTip}</span><em>查看明细</em></button>`:`<div class="pending stats-metric untrackable"><strong>—</strong><span>未提交 ${pendingTip}</span></div>`;
  const external=`<div class="external stats-metric"><strong>${snapshot.externalDone}</strong><span>外部提交数 ${externalTip}</span></div>`;
  const rate=trackable?`<div class="rate stats-summary-rate"><strong>${snapshot.rate}%</strong><span>完成率 ${rateTip}</span></div>`:`<div class="rate stats-summary-rate untrackable"><strong>—</strong><span>完成率 ${rateTip}</span></div>`;
  return `<div class="stats-summary-grid">${submitted}${pending}${external}${rate}</div>`;
 }
 const submitted=trackable?`<button class="submitted" data-detail-kind="submitted" data-survey-id="${s.id}"><span>已提交 ${submittedTip}</span><strong>${snapshot.internalDone}</strong><em>查看内部人员提交明细 →</em></button>`:`<div class="submitted stats-metric untrackable"><span>已提交 ${submittedTip}</span><strong>0</strong><em>暂无内部接收人员</em></div>`;
 const pending=trackable?`<button class="pending" data-detail-kind="pending" data-survey-id="${s.id}"><span>未提交 ${pendingTip}</span><strong>${snapshot.pending}</strong><em>查看未提交明细 →</em></button>`:`<div class="pending stats-metric untrackable"><span>未提交 ${pendingTip}</span><strong>—</strong><em>暂无内部接收人员</em></div>`;
 const external=`<div class="external stats-metric"><span>外部提交数 ${externalTip}</span><strong>${snapshot.externalDone}</strong><em>不支持人员明细</em></div>`;
 const rate=trackable?`<div class="rate"><span>完成率 ${rateTip}</span><strong>${snapshot.rate}%</strong><em>内部提交进度</em></div>`:`<div class="rate untrackable"><span>完成率 ${rateTip}</span><strong>—</strong><em>暂无内部接收人员</em></div>`;
 return `<div class="pc-summary-grid">${submitted}${pending}${external}${rate}</div>`;
}
function statsUnavailablePage(){const body='<div class="mobile-unavailable stats-route-unavailable"><i>!</i><b>问卷不存在或已删除</b><span>请返回统计列表选择可访问的问卷。</span></div>';return state.preview==='mobile'?`${statsMobileHead('统计详情','#stats')}${body}`:`<div class="pc-stats-page"><div class="pc-stats-breadcrumb"><a class="pc-back-btn" href="#all-surveys">← 返回</a><span>问卷统计</span></div>${body}</div>`}
function renderStatsDetailPage(s=statsSurvey()){
 if(!s)return statsUnavailablePage();
 const snapshot=statsSnapshot(s),back=state.statsBack||'#all-surveys',questions=statsQuestions(s),dateControl=statsDateControl(s),summary=snapshot.hasData?statsSummaryCards(s,snapshot):'<div class="stats-no-task">当前没有可统计的任务数据</div>';
 if(state.preview==='mobile')return `${statsMobileHead('统计详情',state.portal==='school'?'#stats':back,statsMobileMenuButton(s))}<div class="stats-detail-hero"><div><h2>${esc(s.title)}</h2><span class="tag ${s.status}">${s.statusText}</span></div><dl><div><dt>创建人</dt><dd>${esc(s.owner)}</dd></div><div><dt>创建时间</dt><dd>${s.createdAt.slice(0,10)}</dd></div><div><dt>统计范围</dt><dd>${esc(s.target)}</dd></div></dl></div><section class="stats-data"><div class="stats-mobile-section-head"><h2>数据统计</h2>${dateControl}</div>${summary}</section><section class="question-analytics"><h2>题目数据</h2>${snapshot.hasData?questions.map((q,i)=>questionStatRow(q,i,s.id)).join(''):'<div class="stats-no-task">暂无题目统计数据</div>'}</section>`;
 const selected=Math.min(state.pcStatsQuestion,Math.max(0,questions.length-1)),q=questions[selected];
 return `<div class="pc-stats-page"><div class="pc-stats-breadcrumb"><a class="pc-back-btn" href="${back}">← 返回</a><span>问卷统计</span></div><header class="pc-stats-header"><div><div class="pc-stats-title"><h1>${esc(s.title)}</h1><span class="tag ${s.status}">${s.statusText}</span></div><dl><div><dt>创建人</dt><dd>${esc(s.owner)}</dd></div><div><dt>创建时间</dt><dd>${s.createdAt.slice(0,10)}</dd></div></dl></div></header><section class="pc-stats-summary"><div class="pc-section-head"><div><h2>数据统计</h2></div>${dateControl}</div>${summary}</section><section class="pc-question-section"><div class="pc-section-head"><div><h2>题目数据</h2></div></div>${snapshot.hasData&&q?`<div class="pc-question-layout"><nav class="pc-question-nav">${questions.map((item,i)=>`<button class="${selected===i?'active':''}" data-pc-question-index="${i}"><b>${String(i+1).padStart(2,'0')}</b><span>${esc(item.title)}<small>${item.type}</small></span><em>${item.count} 份</em></button>`).join('')}</nav><article class="pc-question-detail"><div class="pc-question-detail-head"><div><span>第 ${selected+1} 题 · ${q.type}</span><h3>${esc(q.title)}</h3></div><strong>${q.count}<small>有效回答</small></strong></div>${questionStatBody(q,s.id,selected)}</article></div>`:'<div class="stats-no-task">暂无题目统计数据</div>'}</section></div>`;
}
function statsRoutePage(){const parts=state.page.split('/');if(parts[1]==='detail')return renderStatsDetailPage();if(parts[1]==='people')return statsSurvey()?statsPeoplePage(parts[3]||'submitted'):statsUnavailablePage();if(parts[1]==='save-folder')return mobileResourceFolderPage();return statsPage()}
function statsDetailPage(s=statsSurvey()){return renderStatsDetailPage(s)}
function completeTextAnswers(count,base,templates,isName=false){if(!count)return[];return Array.from({length:count},(_,i)=>{if(i<base.length)return base[i];const value=templates[(i-base.length)%templates.length];return isName?`${value}${i>=base.length+templates.length?String(Math.floor((i-base.length)/templates.length)+1).padStart(2,'0'):''}`:`${value}（第 ${i+1} 条）`})}
function distributedOptions(count,labels,weights){let remaining=count;return labels.map((label,i)=>{const value=i===labels.length-1?remaining:Math.min(remaining,Math.round(count*weights[i]));remaining-=value;return[label,value]})}
function demoRecords(count,templates){return Array.from({length:Math.min(count,8)},(_,i)=>({...templates[i%templates.length],submitter:['张雨晴','李文博','周老师','王晨曦','陈思源','赵雨桐','刘子涵','孙嘉宁'][i%8],time:`2026-08-${String(13-i%5).padStart(2,'0')} ${String(9+i).padStart(2,'0')}:${String(8+i*7).padStart(2,'0')}`}))}
function statsQuestionFromSchema(s,source,index){const total=s.done,kind=questionKind(source.type),base={title:source.title,type:questionTypeLabel(source.type),kind,count:total},school=state.portal==='school';if(kind==='text')return{...base,answers:completeTextAnswers(total,['张雨晴','李文博','周老师'],['王晨曦','陈思源','赵雨桐','刘子涵','孙嘉宁','吴老师','郑文轩','林晓月'],source.title.includes('姓名'))};if(kind==='single'){const labels=source.options?.length?source.options:(school?['七年级','八年级','九年级']:['实验学校','第一小学','第二中学','其他学校']),weights=labels.map((_,i)=>i===labels.length-1?1:Math.max(.08,(labels.length-i)/(labels.length*(labels.length+1)/2)));return{...base,options:distributedOptions(total,labels,weights)}}if(kind==='multiple'){const valid=Math.max(0,Math.round(total*.94)),labels=source.options?.length?source.options:['选项一','选项二','选项三'];return{...base,count:valid,options:labels.map((label,i)=>[label,Math.round(valid*Math.max(.2,.72-i*.14))])}}if(kind==='date'){const valid=Math.max(0,Math.round(total*.86));return{...base,count:valid,dates:distributedOptions(valid,['2026-08-17','2026-08-18','2026-08-19','2026-08-20'],[.34,.29,.22,.15])}}if(kind==='file'){const valid=Math.max(0,Math.round(total*.56));return{...base,count:valid,files:demoRecords(valid,[{name:'校园环境照片.jpg',format:'JPG',size:'2.4 MB',preview:'image'},{name:'情况说明.pdf',format:'PDF',size:'860 KB',preview:'file'},{name:'活动现场.png',format:'PNG',size:'1.8 MB',preview:'image'},{name:'信息汇总表.xlsx',format:'XLSX',size:'128 KB',preview:'sheet'}])}}if(kind==='signature'){const valid=Math.max(0,Math.round(total*.81));return{...base,count:valid,signatures:demoRecords(valid,[{name:'张雨晴'},{name:'李文博'},{name:'周老师'},{name:'王晨曦'}])}}if(kind==='location'){const valid=Math.max(0,Math.round(total*.77)),labels=school?['学校东门','教学楼','体育场','学生宿舍']:['教育局机关','临江县实验学校','临江县第一小学','临江县第二中学'],addresses=school?['临江县育才路18号东门','临江县育才路18号教学区','临江县育才路18号运动区','临江县育才路18号生活区']:['临江县行政中心教育局办公区','临江县学府路16号','临江县朝阳路8号','临江县青年路25号'];return{...base,count:valid,locations:distributedOptions(valid,labels,[.38,.27,.21,.14]).map((item,i)=>({name:item[0],count:item[1],address:addresses[i],coordinate:[['30.2741','120.1551'],['30.2816','120.1628'],['30.2684','120.1495'],['30.2892','120.1713']][i]}))}}return base}
function statsQuestions(s){const snapshot=statsSnapshot(s),view={...s,done:snapshot.submitted};return surveyQuestions(s).map((question,index)=>statsQuestionFromSchema(view,question,index))}
function textAnswerKey(surveyId,questionIndex){return `${state.portal}:${surveyId}:${questionIndex}`}
function textAnswerRows(answers,start=0){return answers.map((answer,i)=>`<div class="text-answer-row"><b>${String(start+i+1).padStart(2,'0')}</b><span>${esc(answer)}</span></div>`).join('')}
function optionStatRows(q,label='份'){if(!q.count)return '<div class="text-answer-empty">暂无有效回答</div>';return q.options.map(x=>{const pct=Math.round(x[1]/q.count*100);return `<div class="option-stat"><span>${esc(x[0])}</span><div><i style="width:${Math.min(100,pct)}%"></i></div><b>${x[1]}${label} · ${pct}%</b></div>`}).join('')}
function textQuestionStat(q,surveyId,questionIndex){if(!q.count)return '<div class="text-answer-empty">暂无文本回答</div>';const key=textAnswerKey(surveyId,questionIndex),view=state.textAnswerViews[key]||{expanded:false,page:1};if(!view.expanded)return `<div class="text-answers"><div class="text-answer-list preview">${textAnswerRows(q.answers.slice(0,3))}</div>${q.count>3?`<button class="link-btn" data-action="view-all-answers" data-answer-key="${key}">查看全部 ${q.count} 条回答</button>`:''}</div>`;const pageSize=10,totalPages=Math.max(1,Math.ceil(q.count/pageSize)),page=Math.min(Math.max(1,view.page||1),totalPages),start=(page-1)*pageSize,rows=q.answers.slice(start,start+pageSize);return `<div class="text-answers expanded"><div class="text-answer-toolbar"><span>全部回答（${q.count}）</span><button class="link-btn" data-action="collapse-all-answers" data-answer-key="${key}">收起回答</button></div><div class="text-answer-list">${textAnswerRows(rows,start)}</div><div class="text-answer-pagination"><button class="btn sm" data-action="page-text-answers" data-answer-key="${key}" data-answer-page="${page-1}" ${page===1?'disabled':''}>上一页</button><span>第 ${page} / ${totalPages} 页</span><button class="btn sm" data-action="page-text-answers" data-answer-key="${key}" data-answer-page="${page+1}" ${page===totalPages?'disabled':''}>下一页</button></div></div>`}
function dateQuestionStat(q){if(!q.count)return '<div class="text-answer-empty">暂无日期回答</div>';return `<div class="stat-caption">按日期汇总 · 共 ${q.count} 份有效回答</div><div class="date-stat-list">${q.dates.map(x=>{const pct=Math.round(x[1]/q.count*100);return `<div class="date-stat"><time>${x[0]}</time><div><i style="width:${pct}%"></i></div><b>${x[1]}份 · ${pct}%</b></div>`}).join('')}</div>`}
function statPreviewAttrs(kind,title,submitter,time){return `data-stat-preview="${kind}" data-preview-title="${esc(title)}" data-preview-submitter="${esc(submitter)}" data-preview-time="${esc(time)}"`}
function resourceCenterAvailable(){return state.portal==='school'&&state.resourceCenterEnabled}
function statsRouteSurveyId(page,kind){const match=new RegExp(`^stats/${kind}/([^/]+)`).exec(page||'');if(!match)return null;const id=Number(match[1]);return Number.isFinite(id)?id:null}
function shouldClearAttachmentSelections(previous,next){const previousDetail=statsRouteSurveyId(previous,'detail'),previousFolder=statsRouteSurveyId(previous,'save-folder'),nextDetail=statsRouteSurveyId(next,'detail'),nextFolder=statsRouteSurveyId(next,'save-folder');if(previousDetail!==null)return nextDetail!==previousDetail&&nextFolder!==previousDetail;if(previousFolder!==null)return nextDetail!==previousFolder;return false}
function saveFolderRouteContext(page){const match=/^stats\/save-folder\/([^/]+)\/([^/]+)$/.exec(page||'');return match?selectedSaveContext(Number(match[1]),Number(match[2])):null}
function attachmentSelectionKey(surveyId,questionIndex){return `${surveyId}:${questionIndex}`}
function attachmentSelection(surveyId,questionIndex,total=null){const key=attachmentSelectionKey(surveyId,questionIndex);if(!state.attachmentSelections[key])state.attachmentSelections[key]={all:false,ids:new Set(),excluded:new Set(),total:Math.max(0,total||0)};if(total!==null)state.attachmentSelections[key].total=Math.max(0,total);return state.attachmentSelections[key]}
function selectedAttachmentCount(selection){return selection.all?Math.max(0,selection.total-selection.excluded.size):selection.ids.size}
function clearAttachmentSelections(){state.attachmentSelections={};state.resourceFolderId='';state.resourceFolderName='';state.resourceReturnPage=''}
function attachmentId(surveyId,questionIndex,index){return `${surveyId}-${questionIndex}-${index}`}
function splitResourceFileName(value){const name=String(value||'附件.dat'),dot=name.lastIndexOf('.');return dot>0?{stem:name.slice(0,dot),extension:name.slice(dot)}:{stem:name,extension:''}}
function attachmentFileRecord(context,index){const visible=context.question.files?.[index],id=attachmentId(context.survey.id,context.questionIndex,index);if(visible)return{id,index,name:visible.name||`附件_${index+1}.dat`,format:visible.format||'',synthetic:false};const samples=context.question.files||[],sample=samples.length?samples[index%samples.length]:null,extension=splitResourceFileName(sample?.name||'附件.dat').extension||'.dat';return{id,index,name:`答卷附件_${String(index+1).padStart(4,'0')}${extension}`,format:(extension.slice(1)||'DAT').toUpperCase(),synthetic:true}}
function selectedAttachmentFiles(context){if(!context.survey||context.question?.kind!=='file')return[];const records=[],total=Math.max(0,context.question.count||0);for(let index=0;index<total;index++)records.push(attachmentFileRecord(context,index));return records}
function fileQuestionStat(q,surveyId,questionIndex){if(!q.count)return '<div class="text-answer-empty">暂无上传的文件或图片</div>';const school=state.portal==='school';return `${school?`<div class="asset-save-toolbar"><div><b>该题共 ${q.count} 份附件</b><span>另存时将保存该题全部上传文件</span></div><button type="button" class="btn green" data-save-assets data-survey-id="${surveyId}" data-question-index="${questionIndex}">另存为</button></div>`:''}<div class="stat-caption">最近上传记录（共 ${q.count} 份${q.count>q.files.length?`，当前展示 ${q.files.length} 份`:''}）</div><div class="asset-stat-grid">${q.files.map(x=>{const preview=x.preview==='image',attrs=preview?statPreviewAttrs('image',x.name,x.submitter,x.time):'';return `<article class="asset-stat-card">${preview?`<button type="button" class="asset-preview image" ${attrs}><span>图片预览</span></button>`:`<div class="asset-preview ${x.preview}"><span>${x.format}</span></div>`}<div><b>${esc(x.name)}</b><span>${x.format} · ${x.size}</span><small>${esc(x.submitter)} · ${x.time}</small><button class="link-btn" ${preview?attrs:'data-preview-stat-asset="文件"'}>查看</button></div></article>`}).join('')}</div>`}
function resourceFolderById(id,nodes=RESOURCE_FOLDERS[state.resourceSpace]||[],trail=[]){for(const node of nodes){const path=[...trail,node.name];if(node.id===id)return{node,path};const found=resourceFolderById(id,node.children||[],path);if(found)return found}return null}
function resourceFolderTree(nodes=RESOURCE_FOLDERS[state.resourceSpace]||[],depth=0){return nodes.map(node=>`<div class="resource-folder-row ${state.resourceFolderId===node.id?'selected':''} ${node.writable?'':'readonly'}" style="--folder-depth:${depth}"><button type="button" data-resource-folder="${node.id}" ${node.writable?'':`disabled title="无写入权限"`}><i>📁</i><span>${esc(node.name)}</span>${node.writable?'<em>选择</em>':'<em>只读</em>'}</button></div>${node.children?.length?resourceFolderTree(node.children,depth+1):''}`).join('')}
function resourcePickerBody(){const selected=resourceFolderById(state.resourceFolderId),spaceName=state.resourceSpace==='school'?'学校资源':'我的资源';return `<div class="resource-picker-tabs"><button type="button" class="${state.resourceSpace==='mine'?'active':''}" data-resource-space="mine">我的资源</button><button type="button" class="${state.resourceSpace==='school'?'active':''}" data-resource-space="school">学校资源</button></div><div class="resource-picker-breadcrumb">${spaceName}${selected?`　›　${selected.path.map(esc).join('　›　')}`:''}</div><div class="resource-folder-tree">${resourceFolderTree()}</div>`}
function selectedSaveContext(surveyId,questionIndex){const index=Number(questionIndex),survey=CONFIG[state.portal]?.surveys.find(item=>item.id===Number(surveyId))||null,question=survey&&Number.isInteger(index)?statsQuestions(survey)[index]:null;if(!survey||question?.kind!=='file')return{allowed:false,survey,question,files:[],count:0,questionIndex:index};const context={allowed:resourceCenterAvailable(),survey,question,questionIndex:index},files=selectedAttachmentFiles(context);return{...context,files,count:files.length}}
function resourceSaveUnavailableMessage(context){if(state.portal!=='school')return'教育局端不支持将答卷附件另存到校园资源';if(!state.resourceCenterEnabled)return'当前学校未开启校园资源应用，暂无法保存文件，请联系学校管理员开通后重试';if(!context.survey||context.question?.kind!=='file')return'仅文件上传题支持另存到校园资源';return'当前无法使用校园资源另存功能'}
function openResourcePicker(surveyId,questionIndex){const context=selectedSaveContext(surveyId,questionIndex);if(!context.allowed)return toast(resourceSaveUnavailableMessage(context));if(!context.count)return toast('该题暂无可保存的文件');state.resourceReturnPage=`stats/detail/${context.survey.id}`;state.resourceFolderId='';state.resourceFolderName='';if(state.preview==='mobile'){location.hash=`stats/save-folder/${context.survey.id}/${context.questionIndex}`;return}renderPcResourcePicker(context.survey.id,context.questionIndex)}
function renderPcResourcePicker(surveyId,questionIndex){const context=selectedSaveContext(surveyId,questionIndex);if(!context.allowed)return toast(resourceSaveUnavailableMessage(context));if(!context.count)return toast('该题暂无可保存的文件');const m=$('#modal'),folder=resourceFolderById(state.resourceFolderId);m.innerHTML=`<div class="modal resource-picker-modal"><div class="resource-picker-head"><div><h3>保存到文件夹</h3></div><button type="button" data-close-resource-picker aria-label="关闭">×</button></div><div class="pc-resource-picker">${resourcePickerBody()}</div><div class="modal-actions"><button class="btn" data-close-resource-picker>取消</button><button class="btn green" data-confirm-resource-save data-survey-id="${context.survey.id}" data-question-index="${context.questionIndex}" ${folder?.node.writable?'':'disabled'}>确定</button></div></div>`;decorateOverlay($('.resource-picker-modal',m),'resource-picker');m.classList.add('show');bindResourcePicker(m,()=>{m.classList.remove('show');m.innerHTML=''},context.survey.id,context.questionIndex)}
function mobileResourceFolderPage(){const parts=state.page.split('/'),surveyId=+parts[2],questionIndex=+parts[3],context=selectedSaveContext(surveyId,questionIndex),back=`#stats/detail/${surveyId}`;if(state.preview!=='mobile'||!context.allowed||!context.count)return context.survey?statsDetailPage():statsPage();const folder=resourceFolderById(state.resourceFolderId);return `${statsMobileHead('保存到文件夹',back)}<section class="mobile-resource-picker">${resourcePickerBody()}</section><footer class="mobile-resource-footer"><div><span>保存至</span><b>${folder?.path.join(' / ')||'请选择文件夹'}</b></div><button type="button" data-confirm-resource-save data-survey-id="${surveyId}" data-question-index="${questionIndex}" ${folder?.node.writable?'':'disabled'}>确定</button></footer>`}
function bindResourcePicker(root,close,surveyId=null,questionIndex=null){const confirm=$('[data-confirm-resource-save]',root),boundSurveyId=Number(surveyId??confirm?.dataset.surveyId),boundQuestionIndex=Number(questionIndex??confirm?.dataset.questionIndex);$$('[data-resource-space]',root).forEach(button=>button.onclick=()=>{state.resourceSpace=button.dataset.resourceSpace;state.resourceFolderId='';if(state.preview==='mobile')renderShell();else renderPcResourcePicker(boundSurveyId,boundQuestionIndex)});$$('[data-resource-folder]',root).forEach(button=>button.onclick=()=>{state.resourceFolderId=button.dataset.resourceFolder;if(state.preview==='mobile')renderShell();else renderPcResourcePicker(boundSurveyId,boundQuestionIndex)});if(close)$$('[data-close-resource-picker]',root).forEach(button=>button.onclick=close);confirm?.addEventListener('click',event=>openResourceFolderName(+event.currentTarget.dataset.surveyId,+event.currentTarget.dataset.questionIndex))}
function resourceFolderNameValidation(target,value){const name=String(value||'').trim();if(!name)return{valid:false,name,error:'请输入文件夹名称'};if(Array.from(name).length>20)return{valid:false,name,error:'文件夹名称最多输入20个字符'};const duplicate=(target?.node.children||[]).some(child=>resourceNameKey(child.name)===resourceNameKey(name));if(duplicate)return{valid:false,name,error:'当前目录下已存在同名文件夹，请修改名称'};return{valid:true,name,error:''}}
function closeResourceFolderName(surveyId,questionIndex){const m=$('#modal');if(state.preview==='mobile'){m.classList.remove('show');m.innerHTML='';return}renderPcResourcePicker(surveyId,questionIndex)}
function openResourceFolderName(surveyId,questionIndex){const context=selectedSaveContext(surveyId,questionIndex),target=resourceFolderById(state.resourceFolderId);if(!context.allowed)return toast(resourceSaveUnavailableMessage(context));if(!target?.node.writable)return toast('请选择具有写入权限的目标文件夹');state.resourceFolderName='';const m=$('#modal'),path=[state.resourceSpace==='school'?'学校资源':'我的资源',...target.path].join(' / ');m.innerHTML=`<div class="modal resource-folder-name-modal"><div class="resource-folder-name-head"><div><h3>新建文件夹</h3><p>将在“${esc(path)}”下创建子文件夹</p></div><button type="button" data-close-folder-name aria-label="关闭">×</button></div><label class="resource-folder-name-field"><span>文件夹名称</span><input type="text" maxlength="20" autocomplete="off" placeholder="请输入文件夹名称" data-resource-folder-name><small><em data-folder-name-error></em><b><i data-folder-name-count>0</i>/20</b></small></label><div class="modal-actions"><button class="btn" data-close-folder-name>取消</button><button class="btn green" data-save-resource-folder data-survey-id="${surveyId}" data-question-index="${questionIndex}" disabled>保存</button></div></div>`;m.className='modal-mask show stats-confirm-mask';const input=$('[data-resource-folder-name]',m),save=$('[data-save-resource-folder]',m),error=$('[data-folder-name-error]',m),count=$('[data-folder-name-count]',m);const close=()=>closeResourceFolderName(surveyId,questionIndex);$$('[data-close-folder-name]',m).forEach(button=>button.onclick=close);input.addEventListener('input',()=>{const chars=Array.from(input.value);if(chars.length>20)input.value=chars.slice(0,20).join('');state.resourceFolderName=input.value;count.textContent=Array.from(input.value).length;error.textContent='';save.disabled=!input.value.trim()});save.onclick=()=>{const result=resourceFolderNameValidation(target,input.value);if(!result.valid){error.textContent=result.error;input.focus();return}state.resourceFolderName=result.name;startResourceSave(surveyId,questionIndex,result.name)};setTimeout(()=>input.focus(),0)}
function resourceNameKey(name){return String(name||'').toLowerCase()}
function simulatedExistingResourceNames(folderId){return folderId?['校园环境照片.jpg','情况说明.pdf']:[]}
function uniqueResourceFileName(originalName,usedNames){const original=String(originalName||'附件.dat'),originalKey=resourceNameKey(original);if(!usedNames.has(originalKey)){usedNames.add(originalKey);return{name:original,renamed:false}}const{stem,extension}=splitResourceFileName(original);let suffix=1,candidate='';do{candidate=`${stem}(${suffix++})${extension}`}while(usedNames.has(resourceNameKey(candidate)));usedNames.add(resourceNameKey(candidate));return{name:candidate,renamed:true}}
function simulatedFailureIndexes(total,scenario){const indexes=new Set();if(scenario!=='partial'||total<1)return indexes;const first=Math.min(total-1,Math.max(0,Math.ceil(total*.65)-1));indexes.add(first);if(total>1){let second=Math.min(total-1,first+Math.max(1,Math.floor(total*.2)));if(second===first)second=first>0?first-1:1;indexes.add(second)}return indexes}
function prepareResourceSaveFiles(files){const usedNames=new Set();return files.map(file=>{const resolved=uniqueResourceFileName(file.name,usedNames);return{...file,originalName:file.name,savedName:resolved.name,renamed:resolved.renamed,failed:false}})}
function saveProgressMarkup(job){const pct=job.total?Math.round(job.processed/job.total*100):0;return `<div class="modal save-progress-modal save-progress-only" role="status" aria-label="文件保存进度 ${pct}%"><div class="save-progress-track"><i style="width:${pct}%"></i></div><div class="save-progress-percent">${pct}%</div></div>`}
function renderSaveProgress(){const m=$('#modal'),job=state.saveJob;if(!m||!job)return;m.innerHTML=saveProgressMarkup(job);m.className='modal-mask show stats-confirm-mask'}
function startResourceSave(surveyId,questionIndex,folderName){if(state.saveJob?.status==='running')return toast('已有保存任务正在进行');const context=selectedSaveContext(surveyId,questionIndex);if(!context.allowed)return toast(resourceSaveUnavailableMessage(context));if(!context.count)return toast('该题暂无可保存的文件');const target=resourceFolderById(state.resourceFolderId,RESOURCE_FOLDERS[state.resourceSpace]||[]);if(!target?.node.writable)return toast('请选择具有写入权限的目标文件夹');const validation=resourceFolderNameValidation(target,folderName);if(!validation.valid)return toast(validation.error);const child={id:`saved-folder-${Date.now()}`,name:validation.name,writable:true,children:[]};if(!target.node.children)target.node.children=[];target.node.children.push(child);const files=prepareResourceSaveFiles(context.files),job={id:`SAVE-${Date.now()}`,status:'running',surveyId:context.survey.id,questionIndex:context.questionIndex,space:state.resourceSpace,folderId:child.id,folderPath:[...target.path,validation.name],files,total:files.length,processed:0,success:0,failed:0,renamed:0};state.saveJob=job;renderSaveProgress();const step=Math.max(1,Math.ceil(job.total/18));job.timer=setInterval(()=>{if(job.status!=='running'){clearInterval(job.timer);return}job.processed=Math.min(job.total,job.processed+step);job.success=job.processed;job.renamed=job.files.slice(0,job.processed).filter(file=>file.renamed).length;if(job.processed>=job.total){job.status='completed';clearInterval(job.timer);renderSaveProgress();setTimeout(()=>{if(state.saveJob!==job)return;const m=$('#modal');m?.classList.remove('show');if(m)m.innerHTML='';if(state.preview==='mobile'&&state.resourceReturnPage)location.hash=state.resourceReturnPage},650);return}renderSaveProgress()},220)}
function cancelResourceSave(){const job=state.saveJob;if(!job||job.status!=='running')return;clearInterval(job.timer);job.status='cancelled';job.cancelled=Math.max(0,job.total-job.processed);renderSaveProgress()}
function bindAttachmentResourceEvents(root=$('#view')){if(!root)return;root.addEventListener('click',event=>{const target=event.target.closest('[data-save-assets]');if(!target)return;openResourcePicker(+target.dataset.surveyId,+target.dataset.questionIndex)});if(state.page.startsWith('stats/save-folder/')){const parts=state.page.split('/');bindResourcePicker(root,null,+parts[2],+parts[3])}}
function signatureQuestionStat(q){if(!q.count)return '<div class="text-answer-empty">暂无签名记录</div>';return `<div class="stat-caption">最近签名记录（共 ${q.count} 份）</div><div class="signature-stat-grid">${q.signatures.map(x=>{const attrs=statPreviewAttrs('signature',x.name,x.submitter,x.time);return `<article class="signature-stat-card"><button type="button" class="signature-preview" ${attrs}>${esc(x.name)}</button><b>${esc(x.submitter)}</b><span>${x.time}</span><button class="link-btn" ${attrs}>预览签名</button></article>`}).join('')}</div>`}
function locationQuestionStat(q){if(!q.count)return '<div class="text-answer-empty">暂无位置数据</div>';return `<div class="location-stat-list">${q.locations.map(x=>`<article><b>${esc(x.name)}</b><strong>${x.count}人</strong><span>${esc(x.address)}</span><small>坐标 ${x.coordinate[0]}, ${x.coordinate[1]}</small></article>`).join('')}</div>`}
function openStatPreview(trigger){const kind=trigger.dataset.statPreview,title=trigger.dataset.previewTitle||'',submitter=trigger.dataset.previewSubmitter||'',time=trigger.dataset.previewTime||'',m=$('#modal'),visual=kind==='image'?`<div class="asset-preview image stat-preview-image"><span>${esc(title)}</span></div>`:`<div class="stat-preview-signature">${esc(title)}</div>`;m.innerHTML=`<div class="modal stat-preview-modal"><div class="stat-preview-head"><h3>${kind==='image'?'图片内容':'签字内容'}</h3><button type="button" class="stat-preview-close" aria-label="关闭">×</button></div>${visual}<div class="stat-preview-meta"><b>${esc(title)}</b><span>${esc(submitter)} · ${esc(time)}</span></div></div>`;m.classList.add('show');const close=()=>{m.classList.remove('show');m.innerHTML=''};$('.stat-preview-close',m).onclick=close;m.onclick=e=>{if(e.target===m)close()}}
function questionStatBody(q,surveyId,questionIndex){if(q.kind==='text')return textQuestionStat(q,surveyId,questionIndex);if(q.kind==='single')return optionStatRows(q);if(q.kind==='multiple')return `<div class="stat-caption">选择次数 / 选择率（多选题合计选择率允许超过 100%）</div>${optionStatRows(q,'次')}`;if(q.kind==='date')return dateQuestionStat(q);if(q.kind==='file')return fileQuestionStat(q,surveyId,questionIndex);if(q.kind==='signature')return signatureQuestionStat(q);if(q.kind==='location')return locationQuestionStat(q);return '<div class="text-answer-empty">暂无可展示的统计数据</div>'}
function questionStatRow(q,i,surveyId){const open=state.openQuestion===i;return `<article class="question-stat ${open?'open':''}"><button class="question-stat-head" data-question-index="${i}"><span><b>${String(i+1).padStart(2,'0')}.</b> ${q.title}<small>${q.type}</small></span><em>${q.count}份⌄</em></button>${open?`<div class="question-stat-body">${questionStatBody(q,surveyId,i)}</div>`:''}</article>`}
function statsPeopleSeeds(kind){const school=state.portal==='school';if(kind==='submitted')return school?[{name:'张雨晴',scope:'七年级1班',scopeType:'class',identity:'学生',mobile:'13800138001'},{name:'李文博',scope:'七年级2班',scopeType:'class',identity:'学生',mobile:'13800138002'},{name:'周老师',scope:'数学组',scopeType:'department',identity:'教职工',mobile:'13800138003'},{name:'王晨曦',scope:'八年级3班',scopeType:'class',identity:'学生',mobile:'13800138004'},{name:'陈思源',scope:'九年级1班',scopeType:'class',identity:'学生',mobile:'13800138005'}]:[{name:'张雨晴',scope:'临江县实验学校',scopeType:'school',identity:'教师',mobile:'13800138001'},{name:'李文博',scope:'临江县第一小学',scopeType:'school',identity:'教师',mobile:'13800138002'},{name:'周老师',scope:'临江县第二中学',scopeType:'school',identity:'教师',mobile:'13800138003'},{name:'王晨曦',scope:'城关小学',scopeType:'school',identity:'管理人员',mobile:'13800138004'},{name:'陈思源',scope:'民族中学',scopeType:'school',identity:'教师',mobile:'13800138005'}];return school?[{name:'孙老师',scope:'语文组',scopeType:'department',identity:'教职工',mobile:'13900139001'},{name:'赵同学',scope:'七年级3班',scopeType:'class',identity:'学生',mobile:'13900139002'},{name:'钱同学',scope:'八年级1班',scopeType:'class',identity:'学生',mobile:'13900139003'},{name:'周老师',scope:'教务处',scopeType:'department',identity:'教职工',mobile:'13900139004'}]:[{name:'孙老师',scope:'办公室',scopeType:'department',identity:'内部人员',mobile:'13900139001'},{name:'赵老师',scope:'临江县实验学校',scopeType:'school',identity:'学校人员',mobile:'13900139002'},{name:'钱老师',scope:'临江县第一小学',scopeType:'school',identity:'学校人员',mobile:'13900139003'},{name:'周老师',scope:'教研室',scopeType:'department',identity:'内部人员',mobile:'13900139004'}]}
function statsAnswerValues(questions,person,index){return questions.map(q=>{if(q.kind==='text')return person.name;if(q.kind==='single')return q.options.length?q.options[index%q.options.length][0]:'';if(q.kind==='multiple')return q.options.slice(0,Math.min(q.options.length,index%3+1)).map(x=>x[0]).join('、');if(q.kind==='date')return q.dates.length?q.dates[index%q.dates.length][0]:'';if(q.kind==='file')return q.files.length?q.files[index%q.files.length].name:'未上传';if(q.kind==='signature')return `已签名（${person.name}）`;if(q.kind==='location'){const x=q.locations[index%Math.max(1,q.locations.length)];return x?`${x.name}｜${x.address}｜${x.coordinate[0]}, ${x.coordinate[1]}`:''}return''})}
function storedResponseValues(questions,record,fallback){if(!record?.answers?.length)return fallback;return questions.map((q,index)=>{const exact=record.answers.find(answer=>answer[0]===q.title),value=exact?.[1]??record.answers[index]?.[1]??fallback[index]??'';return readableAnswerValue(value)})}
function statsPeopleData(kind,s=statsSurvey(),full=false){const snapshot=statsSnapshot(s),seeds=statsPeopleSeeds(kind),target=kind==='submitted'?snapshot.internalDone:snapshot.pending??0,length=full?target:Math.min(target,seeds.length),questions=kind==='submitted'?statsQuestions(s):null,allRecords=kind==='submitted'?(MY_RESPONSES[state.portal]?.[s.id]||[]).filter(record=>record&&record.valid!==false&&record.external!==true&&Boolean(record.personId)):[],records=isDailySurvey(s)&&snapshot.date?allRecords.filter(record=>record.submittedAt?.slice(0,10)===snapshot.date):allRecords,recordDate=snapshot.date||'2026-08-13';return Array.from({length},(_,index)=>{const seed=seeds[index%seeds.length],round=Math.floor(index/seeds.length),person={...seed,name:round?`${seed.name}${round+1}`:seed.name,mobile:round?`13${String(800000000+index).slice(-9)}`:seed.mobile};if(kind==='submitted'){const record=records[index],fallback=statsAnswerValues(questions,person,index);person.responseId=record?.id||`${String(s.id).toUpperCase()}-${recordDate.replaceAll('-','')}-${String(index+1).padStart(6,'0')}`;person.submittedAt=record?.submittedAt||`${recordDate} ${String(8+index%10).padStart(2,'0')}:${String(index*7%60).padStart(2,'0')}:${String(index*11%60).padStart(2,'0')}`;person.status='已提交';person.answers=storedResponseValues(questions,record,fallback)}return person})}
function exportStatsWorkbook(kind,s=statsSurvey()){try{if(!window.XLSX)throw new Error('XLSX library unavailable');const people=statsPeopleData(kind,s,true),isDone=kind==='submitted';if(!people.length)return toast('暂无可下载的明细');let rows;if(isDone){const questions=statsQuestions(s);rows=people.map((person,rowIndex)=>{const row={'序号':rowIndex+1,'姓名':String(person.name),'所属范围':String(person.scope),'身份':String(person.identity),'手机号':String(person.mobile),'提交时间':String(person.submittedAt),'提交状态':String(person.status)};questions.forEach((q,index)=>row[`第${String(index+1).padStart(2,'0')}题：${q.title}`]=String(person.answers[index]??''));return row})}else{const scopeTitle=state.portal==='school'?'部门/班级':'部门/学校';rows=people.map(person=>({'姓名':String(person.name),[scopeTitle]:String(person.scope),'手机号':String(person.mobile)}))}const sheet=XLSX.utils.json_to_sheet(rows),book=XLSX.utils.book_new();sheet['!cols']=isDone?[{wch:8},{wch:14},{wch:22},{wch:12},{wch:15},{wch:21},{wch:12},...statsQuestions(s).map(q=>({wch:q.kind==='location'?46:q.kind==='multiple'?32:24}))]:[{wch:14},{wch:24},{wch:15}];XLSX.utils.book_append_sheet(book,sheet,isDone?'已提交明细':'未提交明细');XLSX.writeFile(book,isDone?'下载已提交明细.xlsx':'下载未提交明细.xlsx',{compression:true});toast(`${isDone?'已提交':'未提交'}明细下载成功`)}catch(error){console.error(error);toast('明细下载失败，请重试')}}
function statsPeoplePage(kind){const s=statsSurvey(),snapshot=statsSnapshot(s),isDone=kind==='submitted',date=isDailySurvey(s)?snapshot.date:'',unidentified=!isDone&&surveySubmittedPersonState(s,date,snapshot.internalDone).anonymousCount>0,trackable=snapshot.hasData&&(isDone||snapshot.total>0),count=isDone?snapshot.internalDone:trackable?snapshot.pending:null,rows=trackable?statsPeopleData(kind,s):[],school=state.portal==='school',back=`#stats/detail/${s.id}`,pendingHead=school?'部门/班级':'部门/学校',listHead=`<div class="people-list-head ${isDone?'':'pending'}"><b>姓名</b><b>${isDone?(school?'班级/部门':'学校'):pendingHead}</b><b>手机号</b></div>`,listRows=rows.length?rows.map(x=>`<div class="people-row ${isDone?'':'pending'}" data-scope-type="${x.scopeType}"><span><b>${esc(x.name)}</b></span><span>${esc(x.scope)}</span><span>${esc(x.mobile)}</span></div>`).join(''):`<div class="pending-empty"><b>${trackable?(isDone?'暂无内部人员提交记录':unidentified?'未提交名单不可识别':'暂无未提交人员'):'暂无可查看明细'}</b><span>${trackable?(isDone?'当前日期没有可识别的内部人员提交记录。':unidentified?'历史提交缺少人员标识，无法生成准确的未提交名单。':'当前所有可识别接收人员均已提交。'):'当前没有可统计的任务数据。'}</span></div>`,externalNotice=isDone&&snapshot.externalDone>0?`<div class="external-detail-notice">外部提交已单独统计，不计入已提交和完成率，且不支持查看人员明细。当前共 ${snapshot.externalDone} 份外部提交。</div>`:'',download=trackable&&rows.length?`<button class="stats-download" data-action="download-stats" data-stats-kind="${kind}">下载${isDone?'已提交':'未提交'}明细</button>`:'',content=`${externalNotice}<section class="people-overview"><div class="people-donut ${trackable?'':'untrackable'}"><span>${isDone?'内部人员':'全部'}<b>${count===null?'—':count}</b></span></div></section><section class="people-list ${isDone?'':'pending-people-list'}">${listHead}${listRows}${download}</section>`;if(state.preview==='mobile')return `${statsMobileHead('填写明细',back)}${content}`;return `<div class="pc-stats-page pc-people-page"><div class="pc-stats-breadcrumb"><a class="pc-back-btn" href="${back}">← 返回问卷统计</a><span>收集明细</span></div><header class="pc-people-header"><div><h1>${isDone?'已提交':'未提交'}明细</h1><p>${esc(s.title)}${snapshot.date?` · ${snapshot.date}`:''}</p></div>${trackable&&rows.length?`<button class="btn primary" data-action="download-stats" data-stats-kind="${kind}">下载${isDone?'已提交':'未提交'}明细</button>`:'<span class="subtle">暂无可下载明细</span>'}</header><div class="pc-people-layout">${content}</div></div>`}
function statsOverview(school){return ''}
function questionStats(){return ''}
function detailStats(s){const rows=statsPeopleData('submitted',s);return `<div class="table-wrap"><table class="data-table"><thead><tr><th class="index-col">序号</th><th>姓名</th><th>所属组织</th><th>身份</th><th>填写时间</th><th>提交状态</th><th>操作</th></tr></thead><tbody>${rows.map((person,i)=>`<tr><td class="index-col">${i+1}</td><td>${esc(person.name)}</td><td>${esc(person.scope)}</td><td>${esc(person.identity)}</td><td>${esc(person.submittedAt)}</td><td><span class="tag running">${esc(person.status)}</span></td><td><a class="link-btn" href="#all-surveys/${s.id}/responses/${encodeURIComponent(person.responseId)}">查看答卷</a></td></tr>`).join('')}</tbody></table></div>`}
function surveyTypesPage(){const c=CONFIG[state.portal],items=demoSort(c.surveyTypes.filter(item=>String(item.name||'').includes(state.surveyTypeKeyword.trim()))),page=paginateItems('survey-types',items);return `${pageHead('问卷类型','管理当前'+(state.portal==='bureau'?'教育局':'学校')+'创建的问卷类型，供创建问卷和模板时选择。','<button class="btn primary" data-action="add-survey-type">+ 新增类型</button>')}<div class="filter-card"><div class="toolbar filter-toolbar"><label class="filter-item"><span>类型名称：</span><input id="survey-type-keyword" type="text" maxlength="50" value="${esc(state.surveyTypeKeyword)}" placeholder="请输入类型名称"></label></div><span class="subtle" id="survey-type-count">共 ${page.total} 条记录</span></div><div class="table-wrap"><table class="data-table" id="survey-type-table"><thead><tr><th class="index-col">序号</th><th>类型名称</th><th>类型说明</th><th>关联问卷数</th><th>关联模板数</th><th>创建人</th><th>创建时间</th><th>操作</th></tr></thead><tbody>${page.items.length?page.items.map((item,i)=>`<tr data-type-id="${item.id}" data-type-name="${esc(item.name)}"><td class="index-col">${page.start+i+1}</td><td><div class="title-cell">${esc(item.name)}</div></td><td>${esc(item.description)||'<span class="subtle">—</span>'}</td><td>${surveyTypeSurveyCount(item.id)}</td><td>${surveyTypeTemplateCount(item.id)}</td><td>${esc(item.creator)}</td><td>${item.createdAt}</td><td>${item.source==='system'?'':'<div class="row-actions"><button class="link-btn" data-action="edit-survey-type">编辑</button><button class="link-btn danger" data-action="delete-survey-type">删除</button></div>'}</td></tr>`).join(''):'<tr><td colspan="8"><div class="empty-state"><b>未找到符合条件的问卷类型</b><span>请调整类型名称后重试</span></div></td></tr>'}</tbody></table>${paginationComponent('survey-types',page.totalPages,page.page,page.total)}</div>`}
function openSurveyTypeModal(item){if(item?.source==='system'){toast('系统默认类型不可编辑');return}const editing=Boolean(item),m=$('#modal');m.innerHTML=`<div class="modal"><h3>${editing?'编辑':'新增'}问卷类型</h3><div class="field"><label class="required">类型名称</label><input id="survey-type-name" type="text" maxlength="20" value="${esc(item?.name||'')}" placeholder="请输入类型名称"></div><div class="field" style="margin-top:16px"><label>类型说明</label><textarea id="survey-type-description" maxlength="100" placeholder="请输入类型适用范围或用途">${esc(item?.description||'')}</textarea></div><div class="modal-error" id="survey-type-error"></div><div class="modal-actions"><button class="btn" id="cancel-modal">取消</button><button class="btn primary" id="save-survey-type">保存</button></div></div>`;m.classList.add('show');$('#survey-type-name').focus();$('#cancel-modal').onclick=()=>m.classList.remove('show');$('#save-survey-type').onclick=()=>{const name=$('#survey-type-name').value.trim(),description=$('#survey-type-description').value.trim(),duplicate=CONFIG[state.portal].surveyTypes.some(x=>x.name===name&&x.id!==item?.id);if(!name){$('#survey-type-error').textContent='请输入类型名称';return}if(duplicate){$('#survey-type-error').textContent='当前组织已存在同名问卷类型';return}if(editing){item.name=name;item.description=description}else CONFIG[state.portal].surveyTypes.push({id:Date.now(),name,description,source:'custom',creator:currentUserName(),createdAt:formatSystemTime()});m.classList.remove('show');renderShell();toast(`问卷类型已${editing?'更新':'新增'}`)};m.onclick=e=>{if(e.target===m)m.classList.remove('show')}}
function authPage(){const rows=[['李静','教研室','教研员','全县教师','本人问卷'],['赵晨','教育科','业务管理员','下辖学校','授权问卷'],['孙磊','办公室','局工作人员','局机关内部','本人问卷'],['何倩','安全科','业务管理员','全县学校','组织范围']],page=paginateItems('permissions',rows);return `${pageHead('权限管理','管理教育局端创建、统计与模板权限。','<button class="btn primary" data-action="add-user">+ 添加授权</button>')}<div class="table-wrap"><table class="data-table"><thead><tr><th class="index-col">序号</th><th>人员</th><th>部门</th><th>角色</th><th>创建范围</th><th>结果权限</th><th>状态</th><th>操作</th></tr></thead><tbody>${page.items.map((x,i)=>`<tr><td class="index-col">${page.start+i+1}</td>${x.map(y=>`<td>${y}</td>`).join('')}<td><span class="tag running">启用</span></td><td><button class="link-btn" data-action="edit-auth">编辑</button></td></tr>`).join('')}</tbody></table>${paginationComponent('permissions',page.totalPages,page.page,page.total)}</div>`}
function approvalPage(){const rows=[['八年级学习压力调查','李老师','八年级全年级','2026-8-12 15:20:18','超出任教班级'],['校园社团参与意愿调查','王老师','七、八年级','2026-8-12 14:06:44','跨年级发布'],['教师办公环境满意度','赵老师','全体教职工','2026-8-11 17:40:12','超出学科组']],page=paginateItems('approvals',rows);return `${pageHead('发布审批','审核教师超出授权范围的问卷发布申请。','')}<div class="tabs"><button class="tab active">待审批（3）</button><button class="tab">已审批</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th class="index-col">序号</th><th>问卷名称</th><th>申请人</th><th>申请范围</th><th>申请时间</th><th>审批原因</th><th>操作</th></tr></thead><tbody>${page.items.map((x,i)=>`<tr><td class="index-col">${page.start+i+1}</td>${x.map(y=>`<td>${y}</td>`).join('')}<td><button class="btn sm green" data-action="approve">同意</button> <button class="btn sm danger" data-action="reject">驳回</button></td></tr>`).join('')}</tbody></table>${paginationComponent('approvals',page.totalPages,page.page,page.total)}</div>`}
function bind(){
  applyRuntimeConstraints();
  bindAttachmentResourceEvents();
  bindQuestionEditor();
  $('#mobile-title')?.addEventListener('input',event=>{state.draftTitle=event.target.value});
  $('#mobile-description')?.addEventListener('input',event=>{state.draftDescription=event.target.value});
  $$('[data-prototype-sign]').forEach(button=>button.onclick=()=>{const input=$(`[data-survey-answer="${button.dataset.prototypeSign}"]`);if(input)input.value='已签名（原型）'});
  $$('[data-location-picker-open]').forEach(button=>button.onclick=()=>openMobileLocationPicker(button.dataset.locationPickerOpen,button.dataset.locationPickerMode));
  $$('input[type="file"][data-survey-answer]').forEach(input=>input.onchange=()=>{const q=surveyQuestions(state.preview==='mobile'?mobileSurvey(+state.page.split('/')[2]):receivedSurveyFromRoute())[+input.dataset.surveyAnswer];if(q?.imageOnly&&Array.from(input.files||[]).some(file=>!file.type.startsWith('image/'))){input.value='';toast('该题仅允许上传图片')}});
  const modalRoot=$('#modal'),prdRoot=$('#prd-layer'),deviceStage=$('.device-stage');if(modalRoot&&deviceStage&&modalRoot.parentElement!==deviceStage)deviceStage.appendChild(modalRoot);if(prdRoot&&deviceStage&&prdRoot.parentElement!==deviceStage)deviceStage.appendChild(prdRoot);
  $$('[data-portal-switch]').forEach(b=>b.onclick=()=>{const target=b.dataset.portalSwitch,file=target==='bureau'?'bureau.html':'school.html',widget=state.page==='cloud-widget'||state.page==='mobile/widget';if(state.page==='mobile/widget'&&target!==state.portal)sessionStorage.removeItem(mobileWidgetStorageKey(target));sessionStorage.setItem('survey-preview',state.preview);location.href=`${file}#${widget?(state.preview==='mobile'?'mobile/widget':'cloud-widget'):state.preview==='mobile'?'mobile/fill':state.page.startsWith('mobile/')?'list':state.page}`});
  $$('[data-device-switch]').forEach(b=>b.onclick=()=>switchDevice(b.dataset.deviceSwitch));
  $('[data-mobile-widget-entry]')?.addEventListener('click',openMobileWidget);
  $('[data-mobile-widget-return]')?.addEventListener('click',returnFromMobileWidget);
  $$('[data-pagination]').forEach(pager=>{const pages=$$('[data-page]',pager),size=$('[data-page-size]',pager);pages.forEach(button=>button.onclick=()=>setActivePage(pager,+button.dataset.page));$('[data-page-action="prev"]',pager).onclick=()=>setActivePage(pager,Math.max(1,currentPage(pager)-1));$('[data-page-action="next"]',pager).onclick=()=>setActivePage(pager,Math.min(pages.length,currentPage(pager)+1));if(size)size.onchange=()=>setPageSize(pager,+size.value)});
  $$('[data-list-view]').forEach(b=>b.onclick=()=>{state.listView=b.dataset.listView;if(state.listView==='received'&&!RECEIVED_VISIBLE_STATUSES.has(state.listFilters.status))state.listFilters.status='';resetPagination(`survey-list:${state.listView}`);renderShell()});
  $('[data-create-survey-menu-toggle]')?.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();state.createSurveyMenuOpen=!state.createSurveyMenuOpen;renderShell();if(state.createSurveyMenuOpen)setTimeout(()=>$('.create-survey-menu-popover [role="menuitem"]')?.focus(),0)});
  $('[data-create-survey-custom]')?.addEventListener('click',event=>{event.stopPropagation();state.createSurveyMenuOpen=false;resetCreationState();location.hash='list/create'});
  $('[data-create-survey-template]')?.addEventListener('click',event=>{event.stopPropagation();openTemplateSelectionModal()});
  $('#view')?.addEventListener('click',event=>{if(state.createSurveyMenuOpen&&!event.target.closest('.create-survey-menu')){state.createSurveyMenuOpen=false;renderShell()}});
  $$('[data-survey-qr]').forEach(button=>button.onclick=e=>{e.stopPropagation();const survey=CONFIG[state.portal].surveys.find(item=>item.id===+button.dataset.surveyQr);if(survey)openSurveyQr(survey)});
  ['#filter-title','#filter-owner','#filter-type','#filter-status'].forEach(id=>$(id)?.addEventListener(id==='#filter-title'||id==='#filter-owner'?'input':'change',applySurveyFilters));
  ['#all-filter-title','#all-filter-owner'].forEach(id=>$(id)?.addEventListener('input',applyAllSurveyFilters));
  ['#all-filter-start','#all-filter-end','#all-filter-status'].forEach(id=>$(id)?.addEventListener('change',applyAllSurveyFilters));
  $('#template-name')?.addEventListener('input',applyTemplateFilters);
  $('#template-type')?.addEventListener('change',applyTemplateFilters);
  $('#template-select-name')?.addEventListener('input',applyTemplateSelectionFilters);
  $('#template-select-type')?.addEventListener('change',applyTemplateSelectionFilters);
  $('[data-template-select-close]')?.addEventListener('click',event=>{event.stopPropagation();closeTemplateSelectionModal()});
  $('[data-template-select-mask]')?.addEventListener('click',event=>{if(event.target===event.currentTarget)closeTemplateSelectionModal()});
  $$('[data-template-pick]').forEach(row=>{row.onclick=event=>{event.stopPropagation();selectTemplateForCreation(row.dataset.templatePick)};row.onkeydown=event=>{if(event.key!=='Enter'&&event.key!==' ')return;event.preventDefault();selectTemplateForCreation(row.dataset.templatePick)}});
  $$('[data-add-question-template]').forEach(b=>b.onclick=()=>addQuestionTemplate(b.dataset.addQuestionTemplate));
  $('#survey-type-keyword')?.addEventListener('input',applySurveyTypeFilter);
  $('#recipient-search')?.addEventListener('input',applyRecipientFilter);
  $('#school-type-filter')?.addEventListener('change',applyRecipientFilter);
  $$('[data-action]').forEach(b=>b.onclick=e=>{e.stopPropagation();if(b.dataset.action==='view-stats'){const row=b.closest('tr');state.statsBack='#list';location.hash=`stats/detail/${row.dataset.id}`;return}if(handleResponseAction(b.dataset.action,b))return;if(b.dataset.action==='save-template'){saveSurveyTemplate();return}handleAction(b.dataset.action,b)});
  $$('[data-action="publish"]').forEach(b=>b.onclick=e=>{e.stopPropagation();publishDraft('pc')});
  $$('[data-action="page-text-answers"]').forEach(b=>b.onclick=e=>{e.stopPropagation();const key=b.dataset.answerKey;state.textAnswerViews[key]={expanded:true,page:+b.dataset.answerPage};renderShell()});
  $$('[data-action="end"]').forEach(button=>button.onclick=e=>{e.stopPropagation();const survey=CONFIG[state.portal].surveys.find(item=>item.id==button.closest('tr').dataset.id);modal('确定要提前结束么？','结束后将无法提交问卷！','确认结束',()=>{survey.status='ended';survey.statusText='已结束';renderShell();toast('状态已更新')})});
  $$('[data-survey-detail-source]').forEach(link=>link.onclick=()=>{state.surveyDetailBack=link.dataset.surveyDetailSource==='list'?'#list':'#all-surveys'});
  $$('[data-stats-source]').forEach(link=>link.onclick=()=>{state.statsBack='#all-surveys';state.pcStatsQuestion=0});
  $$('[data-stats-more]').forEach(button=>button.onclick=()=>{const survey=CONFIG[state.portal].surveys.find(item=>item.id===+button.dataset.statsMore&&item.deleted!==1&&item.owner===currentUserName());if(survey)openStatsActionSheet(survey);else toast('无权操作该问卷')});
  $$('[data-action="view-stats"]').forEach(button=>button.addEventListener('click',()=>{state.pcStatsQuestion=0}));
  $$('[data-add-common]').forEach(b=>b.onclick=()=>addCommonQuestion(b.dataset.addCommon));
  $$('[data-add-type]').forEach(b=>b.onclick=()=>addCustomQuestion(b.dataset.addType));
  $$('[data-q-action]').forEach(b=>b.onclick=e=>{e.stopPropagation();qAction(b.dataset.qAction,+b.dataset.i)});
  $$('[data-recipient-tab]').forEach(b=>b.onclick=()=>{state.recipientTab=b.dataset.recipientTab;state.recipientSearch='';state.recipientSchoolType='';renderShell()});
  $$('[data-open-recipient-category]').forEach(b=>b.onclick=()=>{state.recipientTab=b.dataset.openRecipientCategory;state.recipientSearch='';state.recipientSchoolType='';renderShell()});
  $$('[data-close-recipient-category]').forEach(b=>b.onclick=()=>{state.recipientTab='';state.recipientSearch='';state.recipientSchoolType='';renderShell()});
  $('[data-recipient-overview]')?.addEventListener('click',()=>{state.recipientReturnPage='#mobile/settings';state.recipientTab='';state.recipientSearch='';state.recipientSchoolType=''});
  $$('[data-recipient-id]').forEach(b=>b.onchange=()=>toggleRecipient(b));
  $('[data-mobile-recipient-all]')?.addEventListener('change',e=>{if(departmentPersonMode()){mobileSelectableRecipients().forEach(person=>{const id=person.personId||person.id;if(e.target.checked)state.recipients.set(id,{id,personId:id,name:person.name,count:1,category:'department',parent:person.departmentId,departmentId:person.departmentId,departmentName:person.departmentName,position:person.position,status:'active',level:'person'});else state.recipients.delete(id)});recipientTrack(e.target.checked?'recipient_person_select_all':'recipient_person_unselect_all',{search_keyword:state.recipientSearch});renderShell();return}mobileRecipientGroups().forEach(group=>{recipientChildren(group.id).forEach(child=>state.recipients.delete(child.id));if(e.target.checked)state.recipients.set(group.id,{id:group.id,name:group.name,count:group.count,category:state.recipientTab,level:'group'});else state.recipients.delete(group.id)});renderShell()});
  $('[data-mobile-recipient-confirm]')?.addEventListener('click',event=>{if(state.portal==='school'&&!state.recipients.size){event.preventDefault();recipientTrack('recipient_publish_validation_failed',{source:'mobile',error:'内部部门、家长、班级至少选择一项'});toast('内部部门、家长、班级至少选择一项');return}recipientTrack('recipient_selection_confirm',{source:'mobile'})});
  $$('[data-remove-recipient]').forEach(b=>b.onclick=()=>{state.recipients.delete(b.dataset.removeRecipient);renderShell()});
  $('#allow-external')?.addEventListener('change',e=>{state.externalRecipient=e.target.checked});
  $('#mobile-allow-external')?.addEventListener('change',e=>{state.externalRecipient=e.target.checked});
  $$('[data-toggle-recipient-node]').forEach(b=>b.onclick=()=>{const id=b.dataset.toggleRecipientNode,children=$(`[data-recipient-children="${id}"]`),open=children?.classList.contains('show');state.recipientExpansion.set(id,!open);if(DEPARTMENT_PEOPLE[state.portal]?.some(x=>x.id===id))recipientTrack('recipient_department_toggle',{department_id:id,expanded:!open});renderShell()});
  $$('[data-frequency]').forEach(b=>b.onclick=()=>{setCollectionFrequency(b.dataset.frequency);renderShell()});
  $$('[data-mobile-settings-sheet]').forEach(b=>b.onclick=()=>{state.mobileSettingsSheet=b.dataset.mobileSettingsSheet;renderShell()});
  $('.mobile-choice-sheet')?.addEventListener('click',e=>e.stopPropagation());
  $$('[data-mobile-settings-close]').forEach(b=>b.onclick=e=>{if(b.tagName==='BUTTON'||e.target===b){state.mobileSettingsSheet='';renderShell()}});
  $$('[data-mobile-frequency]').forEach(b=>b.onclick=()=>{setCollectionFrequency(b.dataset.mobileFrequency);state.mobileSettingsSheet='';renderShell()});
  $('#start-date')?.addEventListener('input',e=>{state.startDate=e.target.value});
  $('#end-date')?.addEventListener('input',e=>{state.endDate=e.target.value});
  $('#daily-reminder')?.addEventListener('change',e=>{setCollectionDailyReminder(e.target.checked);renderShell()});
  $('#skip-non-workday')?.addEventListener('change',e=>{setCollectionSkipNonWorkday(e.target.checked)});
  $('#reminder-time')?.addEventListener('input',e=>{setCollectionReminderTime(e.target.value)});
  $('#mobile-start-date')?.addEventListener('input',e=>{state.startDate=e.target.value});
  $('#mobile-end-date')?.addEventListener('input',e=>{state.endDate=e.target.value});
  $('#mobile-skip')?.addEventListener('change',e=>{setCollectionSkipNonWorkday(e.target.checked)});
  $('#mobile-remind')?.addEventListener('change',e=>{setCollectionDailyReminder(e.target.checked);renderShell()});
  $('#mobile-reminder-time')?.addEventListener('input',e=>{setCollectionReminderTime(e.target.value)});
  $$('[data-stab]').forEach(b=>b.onclick=()=>{$$('[data-stab]').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#stats-view').innerHTML=b.dataset.stab==='overview'?statsOverview(state.portal==='school'):b.dataset.stab==='question'?questionStats():detailStats();bind()});
  $$('[data-stats-open]').forEach(card=>{const open=e=>{if(e.target.closest('[data-stats-static]'))return;location.hash=`stats/detail/${card.dataset.statsOpen}`};card.onclick=open;card.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('[data-stats-static]')){e.preventDefault();open(e)}}});
  $$('[data-detail-kind]').forEach(button=>button.onclick=e=>{e.stopPropagation();location.hash=`stats/people/${button.dataset.surveyId}/${button.dataset.detailKind}`});
  $('[data-stats-date]')?.addEventListener('change',e=>{state.statsDateBySurvey[e.target.dataset.statsDate]=e.target.value;state.pcStatsQuestion=0;state.openQuestion=0;clearAttachmentSelections();renderShell()});
  $$('[data-stats-tip]').forEach(tip=>{tip.onclick=e=>{e.preventDefault();e.stopPropagation();tip.focus()};tip.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();tip.focus()}}});
  $$('.question-stat-head[data-question-index]').forEach(button=>button.onclick=()=>{const i=+button.dataset.questionIndex;if(state.openQuestion!==i)clearAttachmentSelections();state.openQuestion=state.openQuestion===i?-1:i;renderShell()});
  $$('.pc-question-nav [data-pc-question-index]').forEach(button=>button.onclick=()=>{const next=+button.dataset.pcQuestionIndex;if(state.pcStatsQuestion!==next)clearAttachmentSelections();state.pcStatsQuestion=next;renderShell()});
  $$('[data-stat-preview]').forEach(button=>button.onclick=()=>openStatPreview(button));
  $$('[data-preview-stat-asset]').forEach(button=>button.onclick=()=>toast(`${button.dataset.previewStatAsset}预览已打开（演示）`));
  $$('[data-mobile-filter]').forEach(b=>b.onclick=()=>{state.mobileFilter=b.dataset.mobileFilter;resetPagination(`mobile-fill:${state.mobileFilter}`);renderShell()});
  $$('[data-mobile-survey]').forEach(b=>b.onclick=()=>{location.hash=`mobile/fill/${b.dataset.mobileSurvey}/${b.dataset.mobileView}`});
  $$('[data-action="mobile-submit"]').forEach(b=>b.onclick=e=>{
   e.stopPropagation();const s=mobileSurvey(+b.dataset.surveyId),external=isExternalFillContext(s),records=s?(MY_RESPONSES[state.portal][s.id]||(MY_RESPONSES[state.portal][s.id]=[])):[];if(b.dataset.responseId){toast('已提交答卷不支持修改');return}const allowed=canCreateResponse(s);
   if(!allowed){toast(s?.status==='not_started'?'问卷尚未开始':!external&&!surveyAllowsCurrentPerson(s)?'您当前已不在问卷接收范围内':'当前问卷不可提交');return}
   const answers=collectSurveyAnswers(s),error=responseAnswerError(s,answers);if(error){toast(error);return}
   modal('确认提交？','提交后将保存本次填写内容，且不支持修改。','确认提交',()=>{
    syncSurveyTemporalStatus(s);const stillAllowed=canCreateResponse(s);if(!stillAllowed){toast('当前问卷不可提交');renderShell();return}
    state.mobileAnswers[s.id]=answers;
    const personId=external?'':currentRecipientPersonId(),record={id:`${state.portal==='bureau'?'B':'S'}${s.id}-${Date.now()}`,surveyId:s.id,personId,external,submitter:external?'外部填写人':currentUserName(),submittedAt:responseTimestamp(),valid:true,answers};records.push(record);if(external)s.externalDone=Number(s.externalDone||0)+1;else{s.fillStatus='submitted';s.internalDone=Math.max(Number(s.internalDone||0)+1,currentPersonResponseRecords(s).length)}s.done=submittedCount(s);syncSurveyRecipientAssignments(s);syncDynamicSurveyRecipientTotal(s);location.hash=`mobile/complete/${s.id}`;renderShell();toast('提交成功')
   })
  });
  $('[data-mobile-new]')?.addEventListener('click',()=>{const selectedType=state.mobileTemplateType==='all'?'':state.mobileTemplateType;resetCreationState();state.questions=[];state.draftSurveyTypeId=validSurveyTypeId(selectedType)?selectedType:'';location.hash='mobile/create'});
  $('[data-mobile-template-type-toggle]')?.addEventListener('click',e=>{e.stopPropagation();state.mobileTemplateTypeOpen=!state.mobileTemplateTypeOpen;renderShell()});
  $$('[data-mobile-template-type]').forEach(b=>b.onclick=e=>{e.stopPropagation();state.mobileTemplateType=b.dataset.mobileTemplateType;state.mobileTemplateTypeOpen=false;resetPagination(`mobile-templates:${state.mobileTemplateType}`);renderShell()});
  $('#view')?.addEventListener('click',e=>{if(state.mobileTemplateTypeOpen&&!e.target.closest('.mobile-template-picker')){state.mobileTemplateTypeOpen=false;renderShell()}});
  $('#view')?.addEventListener('click',e=>{if(state.questionMenu>=0&&!e.target.closest('.inline-q-menu')){state.questionMenu=-1;renderShell()}});
  $$('[data-mobile-template-id]').forEach(b=>b.onclick=()=>{const template=surveyTemplateItems().find(item=>String(item.id)===String(b.dataset.mobileTemplateId));if(!template)return;loadSurveyTemplateForCreation(template);location.hash='mobile/create'});
  $('[data-mobile-picker]')?.addEventListener('click',()=>{state.mobileQuestionPicker=true;renderShell()});
  $('[data-mobile-picker-close]')?.addEventListener('click',()=>{state.mobileQuestionPicker=false;renderShell()});
  $$('[data-mobile-common]').forEach(b=>b.onclick=()=>{addCommonQuestion(b.dataset.mobileCommon);state.mobileQuestionPicker=true});
  $$('[data-mobile-type]').forEach(b=>b.onclick=()=>{addCustomQuestion(b.dataset.mobileType);state.mobileQuestionPicker=true});
  $('[data-mobile-picker-confirm]')?.addEventListener('click',()=>{state.mobileQuestionPicker=false;renderShell()});
  $('[data-action="add-survey-template"]')?.addEventListener('click',e=>{e.stopImmediatePropagation();resetCreationState();location.hash='templates/create'},true);
  $$('[data-action="edit-survey-template"]').forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.closest('tr').dataset.surveyTemplateId,item=surveyTemplateItems().find(x=>String(x.id)===String(id));if(!item)return;if(item.source==='system'){toast('系统模板不可编辑');return}loadSurveyTemplateState(item,true);location.hash=`templates/edit/${encodeURIComponent(item.id)}`});
  $$('[data-action="delete-survey-template"]').forEach(b=>b.onclick=e=>{e.stopPropagation();deleteSurveyTemplate(b.closest('tr').dataset.surveyTemplateId)});
  syncRecipientParents();if(state.step===3||state.page==='mobile/recipients')applyRecipientFilter();
}
function currentPage(pager){return +($('[data-page].active',pager)?.dataset.page||1)}
function setActivePage(pager,page){const key=pager.dataset.pagination;if(!key)return;state.pagination[paginationStateKey(key)]=page;renderShell();setTimeout(()=>toast(`已切换至第 ${page} 页`),0)}
function setPageSize(pager,size){const key=pager.dataset.pagination;if(!key||!PAGE_SIZE_OPTIONS.includes(size))return;const stateKey=paginationStateKey(key);state.pageSizes[stateKey]=size;state.pagination[stateKey]=1;renderShell()}
function rerenderFilter(focusId){renderShell();if(!focusId)return;setTimeout(()=>{const input=$(focusId);if(!input)return;input.focus();if(typeof input.setSelectionRange==='function'){const end=input.value.length;input.setSelectionRange(end,end)}},0)}
function applySurveyFilters(event){const f=state.listFilters;f.title=$('#filter-title')?.value||'';f.owner=$('#filter-owner')?.value||'';f.type=$('#filter-type')?.value||'';f.status=$('#filter-status')?.value||'';resetPagination(`survey-list:${state.listView}`);rerenderFilter(event?.type==='input'?`#${event.target.id}`:'')}
function applyAllSurveyFilters(event){const f=state.allSurveyFilters;f.title=$('#all-filter-title')?.value||'';f.owner=$('#all-filter-owner')?.value||'';f.start=$('#all-filter-start')?.value||'';f.end=$('#all-filter-end')?.value||'';f.status=$('#all-filter-status')?.value||'';resetPagination('all-surveys');rerenderFilter(event?.type==='input'?`#${event.target.id}`:'')}
function applyTemplateFilters(event){state.templateFilters.name=$('#template-name')?.value||'';state.templateFilters.type=$('#template-type')?.value||'all';state.templateTypeFilter=state.templateFilters.type;resetPagination('templates');rerenderFilter(event?.type==='input'?`#${event.target.id}`:'')}
function applyTemplateSelectionFilters(event){state.templateSelectFilters.name=$('#template-select-name')?.value||'';state.templateSelectFilters.type=$('#template-select-type')?.value||'all';resetPagination('template-select-modal');rerenderFilter(event?.type==='input'?`#${event.target.id}`:'')}
function applySurveyTypeFilter(event){state.surveyTypeKeyword=$('#survey-type-keyword')?.value||'';resetPagination('survey-types');rerenderFilter(event?.type==='input'?`#${event.target.id}`:'')}
function applyObjectFilters(){const name=$('#object-name')?.value.trim()||'',type=$('#object-type')?.value||'';$$('.tree-row').forEach((row,i)=>{const typeMatch=!type||type==='组织架构'||type==='校内组织'||(type==='角色'&&i===$$('.tree-row').length-1)||(type==='具体人员'&&false);row.classList.toggle('hidden',!row.innerText.includes(name)||!typeMatch)})}
function handleAction(a,b){
 const c=CONFIG[state.portal];
 if(a==='edit-draft'){const row=b.closest('tr'),s=c.surveys.find(x=>x.id==row?.dataset.id);if(!s||s.status!=='draft'||s.owner!==currentUserName())return toast('当前草稿不可编辑');state.editingSurveyId=null;location.hash=`list/edit/${s.id}`;return}
 if(a==='edit-survey'){const row=b.closest('tr'),s=c.surveys.find(x=>x.id==row?.dataset.id&&x.deleted!==1&&x.owner===currentUserName());if(!s)return toast('当前问卷不可编辑');syncSurveyTemporalStatus(s);if(s.status!=='not_started')return toast('问卷状态已变化，当前不可编辑');state.editingSurveyId=null;location.hash=`list/edit/${s.id}`;return}
 if(a==='delete-survey'){const row=b.closest('tr'),s=c.surveys.find(x=>x.id==row?.dataset.id&&x.deleted!==1&&x.owner===currentUserName());if(!s)return toast('当前问卷不可删除');syncSurveyTemporalStatus(s);if(!canDeleteSurvey(s))return toast('当前状态不支持删除');return modal('删除问卷？',`删除“${esc(s.title)}”后，该问卷将从我的问卷、问卷管理和统计列表中移除。`,'确认删除',()=>{syncSurveyTemporalStatus(s);if(!canDeleteSurvey(s)){toast('问卷状态或权限已变化，当前不可删除');renderShell();return}s.deleted=1;renderShell();toast('问卷已删除')})}
 if(a==='view-all-answers'){state.textAnswerViews[b.dataset.answerKey]={expanded:true,page:1};renderShell();return}
 if(a==='collapse-all-answers'){state.textAnswerViews[b.dataset.answerKey]={expanded:false,page:1};renderShell();return}
 if(a==='page-text-answers'){const key=b.dataset.answerKey;state.textAnswerViews[key]={expanded:true,page:+b.dataset.answerPage};renderShell();return}
 if(a==='open-question-picker')return openQuestionPicker();
 if(a==='add-survey-type')return openSurveyTypeModal();
 if(a==='edit-survey-type'){const id=+b.closest('tr').dataset.typeId,item=c.surveyTypes.find(x=>x.id===id);if(item?.source==='system')return toast('系统默认类型不可编辑');return openSurveyTypeModal(item)}
 if(a==='delete-survey-type'){const id=+b.closest('tr').dataset.typeId,item=c.surveyTypes.find(x=>x.id===id);if(!item)return;if(item.source==='system')return toast('系统默认类型不可删除');const surveyCount=surveyTypeSurveyCount(id),templateCount=surveyTypeTemplateCount(id);if(surveyCount||templateCount)return toast(`该类型已关联 ${surveyCount} 份问卷、${templateCount} 个模板，无法删除`);return modal('删除问卷类型？',`删除“${esc(item.name)}”后，该类型将不再可选。`,'确认删除',()=>{c.surveyTypes=c.surveyTypes.filter(x=>x.id!==id);renderShell();toast('问卷类型已删除')})}
 if(a==='mobile-next-settings'){captureCreationInputs();if(!state.draftTitle){toast('请输入问卷标题');return}if(state.draftTitle.length>50){toast('问卷标题不能超过 50 个字符');return}if(!validSurveyTypeId(state.draftSurveyTypeId)){toast('请选择问卷类型');return}if(showQuestionError(firstQuestionError()))return;state.questions.forEach(q=>{if(['单选','多选'].includes(q.type))q.options=q.options.map(x=>x.trim()).filter(Boolean)});state.recipientReturnPage='#mobile/create';location.hash='mobile/recipients';return}
 if(a==='mobile-publish')return publishDraft('mobile');
 if(a==='download-stats')return exportStatsWorkbook(b.dataset.statsKind||'submitted');
 action(a,b)
}
function qAction(action,index){
  const question=state.questions[index];
  if(!question)return;
  if(action==='delete')return modal('删除题目？',`删除第 ${index+1} 题后不可恢复。`,'确认删除',()=>{const [removed]=state.questions.splice(index,1);state.questionMenu=-1;state.questionError=-1;questionTrack('question_delete',{questionId:removed.id,questionType:removed.type,from_index:index});renderShell()});
  if(action==='copy'){if(!canAddQuestion())return;const value=questionValue({...question,id:''},index+1);state.questions.splice(index+1,0,value);state.questionMenu=-1;questionTrack('question_copy',{index:index+1,questionId:value.id,questionType:value.type,source_question_id:question.id});renderShell();return}
  if(action==='up'&&index>0)return moveQuestion(index,index-1);
  if(action==='down'&&index<state.questions.length-1)return moveQuestion(index,index+1);
}
function action(a,b){
 const c=CONFIG[state.portal];
 if(a==='next'){
  const templateWorkflow=state.page==='templates/create'||state.page.startsWith('templates/edit/');
  if(state.step===1){captureCreationInputs();if(!state.draftTitle){toast(templateWorkflow?'请输入模板名称':'请输入问卷标题');return}if(state.draftTitle.length>50){toast(templateWorkflow?'模板名称不能超过 50 个字符':'问卷标题不能超过 50 个字符');return}if(!validSurveyTypeId(state.draftSurveyTypeId)){toast('请选择问卷类型');return}}
  if(templateWorkflow&&state.step===2)return saveSurveyTemplate();
  if(state.step===2){const questionError=firstQuestionError();if(showQuestionError(questionError))return;state.questions.forEach(q=>{if(['单选','多选'].includes(q.type))q.options=q.options.map(x=>x.trim()).filter(Boolean)})}
  if(state.step===3)recipientTrack('recipient_selection_confirm',{source:'pc'})
  state.step=Math.min(4,state.step+1);renderShell();scrollTo(0,0);return
 }
 if(a==='prev'){state.step=Math.max(1,state.step-1);renderShell();scrollTo(0,0);return}
 if(a==='use-template'){const template=surveyTemplateItems().find(item=>String(item.id)===String(b.dataset.templateId));if(!template)return;loadSurveyTemplateForCreation(template);state.step=1;location.hash='list/create';renderShell();toast('模板已应用，请确认基础信息');return}
 if(a==='publish')return publishDraft('pc')
 if(['pause','resume','end'].includes(a)){const row=b.closest('tr'),s=c.surveys.find(x=>x.id==row.dataset.id),resumed=temporalStatusForDates(s.startDate,s.endDate),map={pause:['暂停问卷？','paused','已暂停'],resume:['恢复问卷？',resumed,SURVEY_STATUS_TEXT[resumed]],end:['提前结束问卷？','ended','已结束']};modal(map[a][0],`操作后将立即更新“${s.title}”的问卷状态。`,'确认',()=>{s.status=map[a][1];s.statusText=map[a][2];renderShell();toast('状态已更新')});return}
 if(a==='view-stats')location.hash='stats';else if(a==='save-draft')saveDraftSurvey();else if(a==='start-fill'||a==='continue-fill')toast(a==='start-fill'?'已进入问卷填写':'已继续上次填写');else if(a==='approve'||a==='reject'){const tr=b.closest('tr');tr.style.opacity='.4';b.closest('td').innerHTML=`<span class="tag ${a==='approve'?'running':'ended'}">${a==='approve'?'已同意':'已驳回'}</span>`;toast(a==='approve'?'审批已通过':'申请已驳回')}else if(a==='notify')toast('暂无新的紧急通知');else toast('该操作已在演示模式下完成')
}
function modal(title,text,ok='确定',cb,variant=''){const m=$('#modal'),close=()=>{m.classList.remove('show','qr-modal-mask','stats-confirm-mask');m.innerHTML=''};m.classList.remove('qr-modal-mask','stats-confirm-mask');if(variant)m.classList.add(variant);m.innerHTML=`<div class="modal"><h3>${title}</h3><p>${text}</p><div class="modal-actions"><button class="btn" id="cancel-modal">取消</button><button class="btn primary" id="ok-modal">${ok}</button></div></div>`;m.classList.add('show');$('#cancel-modal').onclick=close;$('#ok-modal').onclick=()=>{close();cb&&cb()};m.onclick=e=>{if(e.target===m)close()}}
function toast(text){const t=$('#toast');t.textContent=text;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),2200)}
function recipientOverviewTabs(){return state.portal==='bureau'?[['department','内部部门'],['school','学校']]:[['department','内部部门'],['parent','家长'],['class','班级']]}
function recipientItemsForCategory(category){const first=recipientOverviewTabs()[0][0];return [...state.recipients.values()].filter(item=>item.category===category||(item.category==='legacy'&&category===first))}
function internalRecipientSummary(){const names=[...state.recipients.values()].map(item=>item.name).filter(Boolean);return names.length>2?`${names.slice(0,2).join('、')}等 ${names.length} 项`:names.join('、')||'暂未选择'}
function recipientModuleMarkup(tab){
 const [category,label]=tab,items=recipientItemsForCategory(category),meta=recipientTabMeta()[category],tags=items.map(item=>`<span>${esc(item.name)}<button type="button" data-remove-recipient="${item.id}" aria-label="移除${esc(item.name)}">×</button></span>`).join(''),selected=items.length?`<div class="recipient-module-tags">${tags}</div>`:'<span class="recipient-module-empty">暂未选择</span>';
 return `<article class="recipient-overview-module ${state.recipientTab===category?'active':''}"><header><div><h3>${label}</h3><p>${esc(meta?.[1]||'选择接收对象')} · 非必填</p></div><button type="button" data-open-recipient-category="${category}">添加人员</button></header><div class="recipient-module-selection">${selected}</div></article>`
}
function recipientPickerMarkup(mobile=false){
 const tabs=recipientOverviewTabs();if(!tabs.some(tab=>tab[0]===state.recipientTab))return'';
 const meta=recipientTabMeta()[state.recipientTab],personMode=departmentPersonMode(),schoolFilter=state.portal==='bureau'&&state.recipientTab==='school',placeholder=personMode?'搜索姓名或部门':'搜索组织、学校或人员',selectable=mobile?mobileSelectableRecipients():[],allSelected=mobile&&selectable.length&&selectable.every(item=>state.recipients.has(item.personId||item.id)),schoolFilterMarkup=schoolFilter?`<select id="school-type-filter" class="${mobile?'mobile-school-filter':'select'}"><option value="">全部学校类型</option>${['小学','初中','九年一贯制'].map(type=>`<option ${state.recipientSchoolType===type?'selected':''}>${type}</option>`).join('')}</select>`:'';
 const filters=mobile?`<div class="mobile-recipient-search"><input id="recipient-search" type="text" maxlength="50" value="${esc(state.recipientSearch)}" placeholder="${placeholder}"></div>${schoolFilterMarkup}`:`<div class="recipient-filter"><div class="recipient-search-box"><span>⌕</span><input id="recipient-search" type="text" maxlength="50" value="${esc(state.recipientSearch)}" placeholder="${placeholder}"></div>${schoolFilterMarkup}</div>`;
 const tree=mobile?`<div class="mobile-recipient-breadcrumb">全部　›</div><label class="mobile-recipient-select-all"><input type="checkbox" data-mobile-recipient-all ${allSelected?'checked':''}><span>${personMode?'全选当前结果':'全选'}</span></label><div class="mobile-recipient-list">${mobileRecipientTree()}<div class="recipient-filter-empty hidden"><b>未找到符合条件的人员</b><span>请调整搜索条件</span></div></div>`:`<div class="recipient-tree pc-recipient-tree">${recipientContent()}<div class="recipient-filter-empty hidden"><b>未找到符合条件的人员</b><span>请调整搜索条件</span></div></div>`;
	 return `<section class="recipient-inline-picker ${mobile?'mobile':'pc'}"><header><div><h3>添加${esc(meta?.[0]||'人员')}</h3><p>${esc(meta?.[1]||'选择接收对象')}</p></div><button type="button" data-close-recipient-category>完成</button></header>${filters}${personMode&&!mobile?'<div class="recipient-table-head person-head name-only"><span>人员姓名</span></div>':''}${tree}<div class="notice">系统将自动合并重复人员，动态范围在填写和统计时按最新有效成员解析。</div></section>`
}
function recipientOverviewMarkup(mobile=false){return `<div class="recipient-overview-list">${recipientOverviewTabs().map(recipientModuleMarkup).join('')}</div>${recipientPickerMarkup(mobile)}`}
function currentObjectStep(){
 if(!recipientOverviewTabs().some(tab=>tab[0]===state.recipientTab))state.recipientTab='';
 const rule=state.portal==='school'?'内部部门、家长、班级均为非必填；如仅面向外部人员，可在收集设置中开启外部填写。':'内部部门与学校均可组合选择；如仅面向外部人员，可在收集设置中开启外部填写。';
 return `<div class="form-card pc-recipient-card recipient-overview-card"><div class="section-title">选择接收人员</div><p class="recipient-overview-rule">${rule}</p>${recipientOverviewMarkup(false)}<div class="recipient-overview-total"><span>已选 ${state.recipients.size} 项</span><b>预计 ${recipientCount()} 人</b></div><div class="footer-actions pc-recipient-actions"><button class="btn" data-action="prev">上一步</button><button class="btn primary" data-action="next">下一步</button></div></div>`
}
function currentMobileRecipientsPage(){
 if(!recipientOverviewTabs().some(tab=>tab[0]===state.recipientTab))state.recipientTab='';
 const rule=state.portal==='school'?'三个模块均为非必填；纯外部问卷可直接进入收集设置并开启外部填写。':'可组合选择内部部门和学校。';
 return `${statsMobileHead('选择成员',state.recipientReturnPage||'#mobile/create')}<section class="mobile-recipient-page mobile-recipient-overview"><div class="recipient-overview-intro"><b>接收对象</b><span>${rule}</span></div>${recipientOverviewMarkup(true)}</section><footer class="mobile-recipient-footer"><div><b>已选 ${state.recipients.size} 项</b><span>预计 ${recipientCount()} 人</span></div><a href="#mobile/settings" data-mobile-recipient-confirm>下一步</a></footer>`
}
function recipientSelectionError(){if(state.portal==='school'&&!state.recipients.size)return'内部部门、家长、班级至少选择一项';if(!state.recipients.size&&!state.externalRecipient)return'请选择接收人员或开启外部填写';return''}
draftValidationError=function(){
 const basicError=!state.draftTitle.trim()?'请输入问卷标题':state.draftTitle.trim().length>50?'问卷标题不能超过 50 个字符':!validSurveyTypeId(state.draftSurveyTypeId)?'请选择问卷类型':firstQuestionError()?.message||'';
 if(basicError)return basicError;const recipientError=recipientSelectionError();if(recipientError)return recipientError;
 if(!state.startDate||!state.endDate)return'请选择开始日期和截止日期';if(state.startDate>state.endDate)return'开始日期不能晚于截止日期';if(state.frequency==='daily'&&state.dailyReminder&&!state.reminderTime)return'请选择每日提醒时间';return''
}
const baseLoadEditableSurveyState=loadEditableSurveyState,baseLoadSurveyTemplateState=loadSurveyTemplateState;
loadEditableSurveyState=function(s){baseLoadEditableSurveyState(s);applyCollectionSettings(state);state.recipientTab='';state.recipientReturnPage=''}
loadSurveyTemplateState=function(item,editing=false){baseLoadSurveyTemplateState(item,editing);applyCollectionSettings(state);state.recipientTab='';state.recipientReturnPage=''}
const baseMobileSettingsPage=mobileSettingsPage;
mobileSettingsPage=function(){
 const count=state.recipients.size,row=`<a class="mobile-settings-recipient" href="#mobile/recipients" data-recipient-overview><span><b>选择成员</b><small>${esc(internalRecipientSummary())}</small></span><em>${count?`已选 ${count} 项`:'添加人员'}　›</em></a>`;
 return baseMobileSettingsPage().replace('<section class="mobile-settings">',`<section class="mobile-settings">${row}`)
}
objectStep=currentObjectStep;
mobileRecipientsPage=currentMobileRecipientsPage;

/* Recipient picker V2: module-scoped counts, transactional picker and bureau workgroups. */
RECIPIENT_DATA.bureau.school=[
 {id:'school-experiment',name:'临江县实验学校',type:'九年一贯制',count:126,staffCount:126},
 {id:'school-first',name:'临江县第一小学',type:'小学',count:82,staffCount:82},
 {id:'school-second',name:'临江县第二中学',type:'初中',count:104,staffCount:104},
 {id:'school-city',name:'城关小学',type:'小学',count:76,staffCount:76}
];
Object.assign(state,{recipientPickerDraft:null,recipientPickerCategory:'',recipientPickerMode:'',recipientPickerSearch:'',recipientPickerGroupSearch:'',recipientPickerPersonSearch:'',recipientPickerSchoolType:'',recipientWorkgroupId:'bureau-workgroup-quality',recipientRules:[],explicitPersonIds:[]});

function recipientSelectionKey(category,id){return `${category}:${id}`}
function recipientScopeSelectionKey(category,id){return `${category}:scope:${id}`}
function recipientDeepClone(item){return {...item,sourceCategories:[...(item.sourceCategories||[])],sourceDepartmentIds:[...(item.sourceDepartmentIds||[])],workgroupIds:[...(item.workgroupIds||[])],workgroupNames:[...(item.workgroupNames||[])],departments:(item.departments||[]).map(value=>({...value})),excludedChildIds:[...(item.excludedChildIds||[])]}}
function recipientItemCategory(item){return item.category==='legacy'?(recipientOverviewTabs()[0]?.[0]||'department'):(item.category||'department')}
function recipientAllWorkgroupLeaves(){return RECIPIENT_WORKGROUP_TREE_V2.flatMap(node=>node.children?.length?node.children:[node])}
function recipientWorkgroupLeaf(id){return recipientAllWorkgroupLeaves().find(node=>node.id===id)||recipientAllWorkgroupLeaves()[0]}
function recipientWorkgroupById(id){return recipientAllWorkgroupLeaves().find(node=>node.id===id)||null}
function recipientDirectoryPerson(personId){for(const group of DEPARTMENT_PEOPLE[state.portal]||[]){const person=group.children.find(value=>value.personId===personId&&value.status==='active'&&value.canReceive!==false);if(person)return {...person,id:person.personId,count:1}}return null}
function recipientPersonAffiliations(personId){return (DEPARTMENT_PEOPLE[state.portal]||[]).flatMap(group=>group.children.filter(person=>person.personId===personId&&person.status==='active'&&person.canReceive!==false).map(person=>({departmentId:group.id,departmentName:group.name,position:person.position||''})))}
function recipientWorkgroupMemberships(personId){return recipientAllWorkgroupLeaves().filter(group=>(group.memberIds||[]).includes(personId)).map(group=>({workgroupId:group.id,workgroupName:group.name}))}
function recipientWorkgroupMembers(groupId){const group=recipientWorkgroupById(groupId);return [...new Set(group?.memberIds||[])].map(recipientDirectoryPerson).filter(Boolean)}
function isDynamicRecipientScope(item){const type=item?.scopeType||recipientItemCategory(item||{});return Boolean(item&&['department','workgroup'].includes(type)&&item.level==='scope'&&['dynamic','dynamic_department'].includes(item.selectionMode))}
function recipientScopeId(item){return item?.scopeId||item?.id||''}
function recipientScopeDefinition(category,id){if(category==='department')return (DEPARTMENT_PEOPLE[state.portal]||[]).find(group=>group.id===id)||null;if(category==='workgroup')return recipientWorkgroupById(id);return null}
function recipientScopeMembers(category,id){const definition=recipientScopeDefinition(category,id);if(!definition)return[];if(category==='department')return definition.isLeaf?recipientChildren(id):[];return recipientWorkgroupMembers(id)}
function recipientScopeIsInvalid(item){if(!isDynamicRecipientScope(item))return false;const category=item.scopeType||recipientItemCategory(item),definition=recipientScopeDefinition(category,recipientScopeId(item)),members=definition?recipientScopeMembers(category,recipientScopeId(item)):[];return !definition||(category==='department'&&!definition.isLeaf)||!members.length}
function recipientResolvedSelection(input,category=''){
 const items=input instanceof Map?[...input.values()]:Array.isArray(input)?input:[],people=new Map(),invalidScopes=[];let rangeTotal=0;
 items.forEach(item=>{const itemCategory=recipientItemCategory(item);if(category&&itemCategory!==category)return;if(item.requiresReselection&&!isDynamicRecipientScope(item)){invalidScopes.push(item);return}if(isDynamicRecipientScope(item)){const scopeType=item.scopeType||itemCategory,scopeId=recipientScopeId(item),definition=recipientScopeDefinition(scopeType,scopeId),members=definition?recipientScopeMembers(scopeType,scopeId):[],selectable=Boolean(definition)&&!(scopeType==='department'&&!definition.isLeaf)&&members.length>0;if(!selectable){invalidScopes.push(item);return}members.forEach(person=>people.set(person.personId||person.id,person));return}if(item.level==='person'||item.personId){const personId=item.personId||item.id;if(!personId)return;if(['department','workgroup'].includes(itemCategory)){const current=recipientDirectoryPerson(personId);if(!current)return;people.set(personId,{...item,...current,id:personId,personId});return}people.set(personId,item);return}rangeTotal+=Number(item.staffCount??item.count??0)});
 return{people,personIds:new Set(people.keys()),rangeTotal,total:people.size+rangeTotal,invalidScopes}
}
function recipientPersonCovered(category,personId,store=state.recipientPickerDraft||state.recipients){return recipientResolvedSelection(store,category).personIds.has(personId)}
function recipientScopeState(category,scopeId,store=state.recipientPickerDraft||state.recipients){const members=recipientScopeMembers(category,scopeId),checked=Boolean(store?.has(recipientScopeSelectionKey(category,scopeId))),selected=members.filter(person=>recipientPersonCovered(category,person.personId||person.id,store)).length;return{checked,indeterminate:category!=='workgroup'&&!checked&&selected>0,selected,members}}
function recipientLegacySchoolRole(item,id){if(state.portal!=='bureau'||recipientItemCategory(item)!=='school')return false;const school=RECIPIENT_DATA.bureau.school.find(value=>id===value.id||id.startsWith(`${value.id}-`));if(!school)return false;return id!==school.id||item.level!=='school'||item.selectionMode!=='all_staff'||!Number.isFinite(Number(item.staffCount))}
function normalizeRecipientMap(input){
 const result=new Map();
 for(const [storedKey,rawValue] of input||[]){
	  const base=recipientDeepClone(rawValue||{}),scopeCategory=base.scopeType||recipientItemCategory(base),identity=base.scopeId||base.departmentId||base.workgroupId||base.id||String(storedKey).split(':').pop(),dynamicScope=['department','workgroup'].includes(scopeCategory)&&base.level==='scope'&&['dynamic','dynamic_department'].includes(base.selectionMode);
	  if(dynamicScope){const definition=recipientScopeDefinition(scopeCategory,identity),members=definition?recipientScopeMembers(scopeCategory,identity):[],valid=Boolean(definition)&&!(scopeCategory==='department'&&!definition.isLeaf)&&members.length>0,name=definition?.name||base.departmentNameSnapshot||base.workgroupNameSnapshot||base.name||identity;Object.assign(base,{id:identity,scopeId:identity,name,category:scopeCategory,level:'scope',scopeType:scopeCategory,selectionMode:'dynamic',count:members.length,requiresReselection:!valid});if(scopeCategory==='department')Object.assign(base,{departmentId:identity,departmentNameSnapshot:name});else Object.assign(base,{workgroupId:identity,workgroupNameSnapshot:name});result.set(recipientScopeSelectionKey(scopeCategory,identity),base);continue}
  const person=base.level==='person'||Boolean(base.personId),sourceCategories=person&&base.sourceCategories?.length?base.sourceCategories:[recipientItemCategory(base)];
  [...new Set(sourceCategories.map(category=>category==='legacy'?'department':category).filter(Boolean))].forEach(category=>{
   const value=recipientDeepClone(base),identity=value.personId||value.schoolId||value.id||String(storedKey).split(':').pop();
   value.category=category;value.id=identity;
   if(person){value.level='person';value.personId=identity;value.count=1}
   if(state.portal==='bureau'&&category==='school'){
    const school=RECIPIENT_DATA.bureau.school.find(item=>item.id===(value.schoolId||identity));
    if(school&&!recipientLegacySchoolRole(value,identity))Object.assign(value,{id:school.id,schoolId:school.id,name:school.name,type:school.type,count:school.staffCount,staffCount:school.staffCount,level:'school',selectionMode:'all_staff'});
    else if(school||recipientLegacySchoolRole(value,identity))Object.assign(value,{requiresReselection:true,count:0,legacyName:value.name||school?.name||'历史学校角色范围'});
   }
   const key=recipientSelectionKey(category,value.personId||value.schoolId||value.id);
   if(!result.has(key))result.set(key,value)
  })
 }
 return result
}
function recipientSelectionContract(store=state.recipients){const recipientRules=[],explicitPersonIds=[];for(const item of store?.values?.()||[]){if(isDynamicRecipientScope(item)&&!recipientScopeIsInvalid(item)){const scopeType=item.scopeType||recipientItemCategory(item),scopeId=recipientScopeId(item),definition=recipientScopeDefinition(scopeType,scopeId),name=definition?.name||item.name||scopeId,rule={selectionMode:'dynamic',scopeType,scopeId,nameSnapshot:name};if(scopeType==='department')Object.assign(rule,{departmentId:scopeId,departmentNameSnapshot:name});else Object.assign(rule,{workgroupId:scopeId,workgroupNameSnapshot:name});recipientRules.push(rule);continue}if(item.level==='person'||item.personId){const personId=item.personId||item.id;if(personId&&!explicitPersonIds.includes(personId))explicitPersonIds.push(personId)}}return{recipientRules,explicitPersonIds}}
function refreshRecipientContractState(){const contract=recipientSelectionContract();state.recipientRules=contract.recipientRules;state.explicitPersonIds=contract.explicitPersonIds;return contract}
state.recipients=normalizeRecipientMap(state.recipients);
refreshRecipientContractState();

recipientOverviewTabs=function(){return state.portal==='bureau'?[['department','内部部门'],['workgroup','工作组'],['school','学校']]:[['department','内部部门'],['parent','家长'],['class','班级']]};
recipientTabMeta=function(){return state.portal==='bureau'?{
	 department:['内部部门','展开部门后选择具体人员，部门本身不可选择'],
	 workgroup:['工作组','通过工作组树定位成员，并在成员列表逐人选择或全选本组'],
	 school:['学校','直接选择具体学校，默认覆盖该校全部有效教职工']
}:{department:['内部部门','展开部门后选择具体人员，部门本身不可选择'],parent:['家长','按年级或班级选择学生家长'],class:['班级','按年级选择全部或部分班级']}};
recipientItemsForCategory=function(category,store=state.recipients){return [...store.entries()].filter(([,item])=>recipientItemCategory(item)===category).map(([key,item])=>({...item,_selectionKey:key}))};
function recipientDisplayItemsForCategory(category,store=state.recipients){const items=recipientItemsForCategory(category,store),scopes=items.filter(item=>isDynamicRecipientScope(item)&&!recipientScopeIsInvalid(item));return items.filter(item=>{if(!(item.level==='person'||item.personId))return true;return !scopes.some(scope=>recipientScopeMembers(scope.scopeType||category,recipientScopeId(scope)).some(person=>(person.personId||person.id)===(item.personId||item.id)))})}
function usableRecipientItems(store=state.recipients){return [...store.values()].filter(item=>!item.requiresReselection&&!recipientScopeIsInvalid(item))}
function recipientCategoryCount(category,store=state.recipients){
 return recipientResolvedSelection(store,category).total
}
recipientCount=function(){return recipientResolvedSelection(state.recipients).total};
function recipientDisplayItems(store=state.recipients){return recipientOverviewTabs().flatMap(([category])=>recipientDisplayItemsForCategory(category,store)).filter(item=>!item.requiresReselection&&!recipientScopeIsInvalid(item))}
recipientSummary=function(){const names=recipientDisplayItems().map(item=>item.name).filter(Boolean),unique=[...new Set(names)];if(state.externalRecipient)unique.push('外部人员');return unique.length>2?`${unique.slice(0,2).join('、')}等 ${unique.length} 项`:unique.join('、')||'未选择'};
internalRecipientSummary=function(){const names=recipientDisplayItems().map(item=>item.name).filter(Boolean),unique=[...new Set(names)];return unique.length>2?`${unique.slice(0,2).join('、')}等 ${unique.length} 项`:unique.join('、')||'暂未选择'};
function surveyRecipientItems(s){if(Array.isArray(s?.recipientSnapshot)&&s.recipientSnapshot.length)return s.recipientSnapshot;const rules=(s?.recipientRules||[]).map(rule=>{const scopeType=rule.scopeType||(rule.workgroupId?'workgroup':'department'),scopeId=rule.scopeId||rule.workgroupId||rule.departmentId,name=rule.nameSnapshot||rule.workgroupNameSnapshot||rule.departmentNameSnapshot||scopeId;return{id:scopeId,scopeId,name,category:scopeType,level:'scope',scopeType,selectionMode:'dynamic',departmentId:scopeType==='department'?scopeId:undefined,departmentNameSnapshot:scopeType==='department'?name:undefined,workgroupId:scopeType==='workgroup'?scopeId:undefined,workgroupNameSnapshot:scopeType==='workgroup'?name:undefined}}),people=(s?.explicitPersonIds||[]).map(personId=>recipientDirectoryPerson(personId)||{id:personId,personId,name:personId,count:1,category:'department',level:'person',status:'active'});return[...rules,...people]}
function surveyHasDynamicRecipientScopes(s){return surveyRecipientItems(s).some(isDynamicRecipientScope)}
function surveyHasResolvedRecipientObjects(s){return surveyRecipientItems(s).some(item=>isDynamicRecipientScope(item)||item.level==='person'||item.personId)}
function surveyRecipientResolution(s){return recipientResolvedSelection(surveyRecipientItems(s))}
function currentRecipientPersonId(){return state.portal==='bureau'?'bureau-person-wangming':'school-person-chenfang'}
function surveyKnownInternalAnswerRecords(s,date=''){
 const currentPersonId=currentRecipientPersonId(),local=responseRecords(s).filter(record=>!record.external).map(record=>({...record,personId:record.personId||currentPersonId})),embedded=[...(Array.isArray(s?.internalResponseRecords)?s.internalResponseRecords:[]),...(Array.isArray(s?.respondentRecords)?s.respondentRecords:[])],records=[...local,...embedded].filter(record=>record&&record.valid!==false&&(!date||String(record.submittedAt||'').slice(0,10)===date)),seen=new Set();
 return records.filter((record,index)=>{const key=record.id||`${record.personId||'unknown'}:${record.submittedAt||''}:${index}`;if(seen.has(key))return false;seen.add(key);return true}).sort((a,b)=>String(b.submittedAt||'').localeCompare(String(a.submittedAt||'')))
}
function surveyKnownRespondentIds(s){const ids=new Set(Array.isArray(s?.respondentPersonIds)?s.respondentPersonIds.filter(Boolean):[]);surveyKnownInternalAnswerRecords(s).forEach(record=>{if(record.personId)ids.add(record.personId)});return ids}
function surveySubmittedPersonState(s,date='',reportedInternalDone=0){
 const records=surveyKnownInternalAnswerRecords(s,date),personIds=new Set(records.map(record=>record.personId).filter(Boolean)),extraPersonIds=[];
 if(!date)surveyKnownRespondentIds(s).forEach(personId=>{if(!personIds.has(personId)){personIds.add(personId);extraPersonIds.push(personId)}});
 const identifiedResponses=records.length+extraPersonIds.length,anonymousRecords=records.filter(record=>!record.personId).length,unrepresentedResponses=Math.max(0,Number(reportedInternalDone||0)-identifiedResponses),anonymousCount=anonymousRecords+unrepresentedResponses;
 return{personIds,anonymousCount,count:personIds.size+anonymousCount,records}
}
function currentPersonResponseRecords(s){const personId=currentRecipientPersonId();return responseRecords(s).filter(record=>!record.external&&record.personId===personId)}
function surveyAllowsCurrentPerson(s){const items=surveyRecipientItems(s),currentPersonId=currentRecipientPersonId(),hasResolvable=items.some(item=>isDynamicRecipientScope(item)||item.level==='person'||item.personId),hasOpaque=items.some(item=>!isDynamicRecipientScope(item)&&item.level!=='person'&&!item.personId&&!item.requiresReselection);if(!hasResolvable)return s?.received===true;if(currentPersonId&&surveyRecipientResolution(s).personIds.has(currentPersonId))return true;return hasOpaque&&s?.received===true}
function recipientAssignmentDate(s,date=beijingDateKey()){return isDailySurvey(s)?date:null}
function syncSurveyRecipientAssignments(s,date=beijingDateKey()){
 if(!s||!surveyHasResolvedRecipientObjects(s))return Array.isArray(s?.recipientAssignments)?s.recipientAssignments:[];
 const collectionDate=recipientAssignmentDate(s,date),all=s.recipientAssignments||(s.recipientAssignments=[]),dayRows=all.filter(row=>(row.collectionDate||null)===collectionDate),resolution=surveyRecipientResolution(s),responses=surveyKnownInternalAnswerRecords(s,collectionDate||''),submittedIds=new Set(responses.map(record=>record.personId).filter(Boolean)),current=resolution.people,byPerson=new Map(dayRows.map(row=>[row.personId,row]));
 if(!collectionDate)surveyKnownRespondentIds(s).forEach(personId=>submittedIds.add(personId));
 current.forEach((person,personId)=>{let row=byPerson.get(personId);const sourceScopes=surveyRecipientItems(s).filter(item=>{if(!isDynamicRecipientScope(item))return false;const scopeType=item.scopeType||recipientItemCategory(item);return recipientScopeMembers(scopeType,recipientScopeId(item)).some(member=>member.personId===personId)}),sourceDepartmentIds=sourceScopes.filter(item=>(item.scopeType||recipientItemCategory(item))==='department').map(recipientScopeId),sourceWorkgroupIds=sourceScopes.filter(item=>(item.scopeType||recipientItemCategory(item))==='workgroup').map(recipientScopeId);if(!row){row={surveyId:s.id,personId,collectionDate,assignedAt:formatSystemTime()};all.push(row);byPerson.set(personId,row)}Object.assign(row,{eligibleNow:true,progressStatus:submittedIds.has(personId)?'submitted':'pending',sourceDepartmentIds:[...new Set(sourceDepartmentIds)],sourceWorkgroupIds:[...new Set(sourceWorkgroupIds)]})});
 byPerson.forEach((row,personId)=>{if(current.has(personId))return;row.eligibleNow=false;if(submittedIds.has(personId))row.progressStatus='submitted'});
 submittedIds.forEach(personId=>{if(byPerson.has(personId))return;const row={surveyId:s.id,personId,collectionDate,eligibleNow:false,progressStatus:'submitted',sourceDepartmentIds:[],sourceWorkgroupIds:[],assignedAt:responses.find(record=>record.personId===personId)?.submittedAt||formatSystemTime()};all.push(row);byPerson.set(personId,row)});
 return [...byPerson.values()]
}
function recipientAssignmentTotal(s,date=beijingDateKey(),reportedInternalDone=null){const resolution=surveyRecipientResolution(s),daily=isDailySurvey(s),snapshot=daily?generatedDailyStats(s)?.[date]:null,reported=reportedInternalDone==null?(daily?Number(snapshot?.internalDone||0):internalSubmittedCount(s)):reportedInternalDone,submitted=surveySubmittedPersonState(s,daily?date:'',reported),people=new Set([...resolution.personIds,...submitted.personIds]),knownUnion=people.size+resolution.rangeTotal;return Math.max(knownUnion,submitted.count)}
function syncDynamicSurveyRecipientTotal(s){if(!surveyHasResolvedRecipientObjects(s))return Number(s?.total||0);const reported=internalSubmittedCount(s),submitted=!isDailySurvey(s)?surveySubmittedPersonState(s,'',reported):null,total=recipientAssignmentTotal(s);s.total=total;s.recipientCountMode=surveyHasDynamicRecipientScopes(s)?'dynamic':'resolved_people';if(submitted&&Number.isFinite(Number(s.internalDone))){s.internalDone=submitted.count;s.done=submitted.count+externalSubmittedCount(s)}return total}
const recipientV3BaseStatsSnapshot=statsSnapshot;
statsSnapshot=function(s){syncDynamicSurveyRecipientTotal(s);const snapshot=recipientV3BaseStatsSnapshot(s);if(!s)return snapshot;if(!surveyHasResolvedRecipientObjects(s)||!snapshot.hasData)return{...snapshot,total:Number(snapshot.total??s.total??0)};const date=isDailySurvey(s)?snapshot.date||beijingDateKey():'',internalDone=surveySubmittedPersonState(s,date,snapshot.internalDone).count,total=recipientAssignmentTotal(s,date||beijingDateKey(),snapshot.internalDone),submitted=internalDone+snapshot.externalDone,pending=total?Math.max(0,total-internalDone):null,internalTotal=internalDone+(pending??0),rate=internalTotal?Math.round(internalDone/internalTotal*100):null;return{...snapshot,total,internalDone,submitted,pending,rate}}
const recipientV2BaseCanCreateResponse=canCreateResponse;
function isExternalFillContext(s){return Boolean(s&&state.page===`mobile/fill/${s.id}/external`)}
canCreateResponse=function(s){syncSurveyTemporalStatus(s);if(!s||s.status!=='running')return false;const external=isExternalFillContext(s);if(external){if(!(s.allowExternal||s.channel==='public'))return false}else if(surveyRecipientItems(s).some(item=>isDynamicRecipientScope(item)||item.level==='person'||item.personId)&&!surveyAllowsCurrentPerson(s))return false;const records=external?responseRecords(s).filter(record=>record.external):currentPersonResponseRecords(s);if(!records.length)return true;if(s.frequency==='daily')return !records.some(record=>String(record.submittedAt||'').slice(0,10)===beijingDateKey());return false};
isReceivedSurveyVisible=function(s){if(!s||s.deleted===1)return false;syncSurveyTemporalStatus(s);const visible=surveyAllowsCurrentPerson(s)||currentPersonResponseRecords(s).length>0;return visible&&RECEIVED_VISIBLE_STATUSES.has(s.status)};

selectedRecipientSnapshot=function(){
	 const people=new Map(),ranges=[],scopes=[];
	 usableRecipientItems().forEach(item=>{
	  if(isDynamicRecipientScope(item)){const scopeType=item.scopeType||recipientItemCategory(item),scopeId=recipientScopeId(item),definition=recipientScopeDefinition(scopeType,scopeId),name=definition?.name||item.departmentNameSnapshot||item.workgroupNameSnapshot||item.name,scope={id:scopeId,scopeId,name,category:scopeType,level:'scope',scopeType,selectionMode:'dynamic'};if(scopeType==='department')Object.assign(scope,{departmentId:scopeId,departmentNameSnapshot:name});else Object.assign(scope,{workgroupId:scopeId,workgroupNameSnapshot:name});scopes.push(scope);return}
  if(item.level==='person'||item.personId){
   const personId=item.personId||item.id,itemCategory=recipientItemCategory(item),current=['department','workgroup'].includes(itemCategory)?recipientDirectoryPerson(personId):null;if(['department','workgroup'].includes(itemCategory)&&!current)return;const source=current?{...item,...current}:item,record=people.get(personId)||{personId,name:source.name,count:1,level:'person',status:source.status||'active',sourceCategories:new Set(),departments:new Map(),positions:new Set(),workgroups:new Map()};
   record.sourceCategories.add(itemCategory);
   const affiliations=recipientPersonAffiliations(personId);(affiliations.length?affiliations:[{departmentId:item.departmentId||'',departmentName:item.departmentName||'',position:item.position||''}]).forEach(value=>{if(value.departmentId)record.departments.set(value.departmentId,{...value});if(value.position)record.positions.add(value.position)});
   const selectedWorkgroups=recipientItemCategory(item)==='workgroup'?(item.workgroupIds||[]).map((workgroupId,index)=>({workgroupId,workgroupName:item.workgroupNames?.[index]||recipientAllWorkgroupLeaves().find(group=>group.id===workgroupId)?.name||''})).filter(value=>value.workgroupId):[];
   (recipientItemCategory(item)==='workgroup'?[...selectedWorkgroups,...recipientWorkgroupMemberships(personId)]:[]).forEach(value=>record.workgroups.set(value.workgroupId,value));people.set(personId,record);return
  }
  if(item.level==='school'||item.schoolId){ranges.push({id:item.schoolId||item.id,schoolId:item.schoolId||item.id,name:item.name,type:item.type||'',count:Number(item.staffCount??item.count??0),staffCount:Number(item.staffCount??item.count??0),category:'school',level:'school',selectionMode:'all_staff'});return}
  ranges.push({id:item.id,name:item.name,count:Number(item.count||0),category:recipientItemCategory(item),level:item.level||'group',parent:item.parent||'',excludedChildIds:[...(item.excludedChildIds||[])]})
 });
 const personSnapshots=[...people.values()].map(record=>{const departments=[...record.departments.values()],workgroups=[...record.workgroups.values()],positions=[...record.positions];return{personId:record.personId,name:record.name,count:1,category:[...record.sourceCategories][0]||'department',level:'person',status:record.status,sourceCategories:[...record.sourceCategories],departmentId:departments[0]?.departmentId||'',departmentName:departments[0]?.departmentName||'',position:positions[0]||'',departments,positions,workgroupIds:workgroups.map(value=>value.workgroupId),workgroupNames:workgroups.map(value=>value.workgroupName)}});
 return [...scopes,...personSnapshots,...ranges]
};
const recipientV3BaseDraftPayload=draftPayload,recipientV3BaseSurveyTemplateValue=surveyTemplateValue,recipientV3BaseDraftRecipientSnapshot=draftRecipientSnapshot;
draftPayload=function(existing=null){const payload=recipientV3BaseDraftPayload(existing),contract=recipientSelectionContract();return{...payload,recipientRules:contract.recipientRules,explicitPersonIds:contract.explicitPersonIds,recipientAssignments:(existing?.recipientAssignments||[]).map(row=>({...row,sourceDepartmentIds:[...(row.sourceDepartmentIds||[])],sourceWorkgroupIds:[...(row.sourceWorkgroupIds||[])]}))}}
surveyTemplateValue=function(existing){return surveyTemplateContentValue(existing)}
draftRecipientSnapshot=function(source){const snapshot=recipientV3BaseDraftRecipientSnapshot(source);if(source?.recipientSnapshot?.length||snapshot.length&&!source?.recipientRules?.length&&!source?.explicitPersonIds?.length)return snapshot;return surveyRecipientItems(source)}

function recipientStatsMeta(s,personId,fallback={}){
 const items=surveyRecipientItems(s),directory=recipientDirectoryPerson(personId),explicit=items.find(item=>(item.personId||item.id)===personId&&(item.level==='person'||item.personId)),selectedScopes=items.filter(item=>isDynamicRecipientScope(item)&&!recipientScopeIsInvalid(item)&&recipientScopeMembers(item.scopeType||recipientItemCategory(item),recipientScopeId(item)).some(person=>(person.personId||person.id)===personId)),scopeNames=[...new Set(selectedScopes.map(item=>item.name).filter(Boolean))];
 if(!scopeNames.length){(explicit?.workgroupNames||[]).forEach(name=>scopeNames.push(name));if(explicit?.departmentName)scopeNames.push(explicit.departmentName)}
 if(!scopeNames.length)recipientPersonAffiliations(personId).forEach(value=>{if(value.departmentName&&!scopeNames.includes(value.departmentName))scopeNames.push(value.departmentName)});
 const scopeType=selectedScopes[0]?.scopeType||recipientItemCategory(selectedScopes[0]||explicit||{})||'department';return{personId,name:directory?.name||explicit?.name||fallback.submitter||fallback.name||'已提交人员',scope:scopeNames.join('、')||'历史答卷人员',scopeType,identity:directory?.position||explicit?.position||'内部人员',mobile:directory?.mobile||explicit?.mobile||'—'}
}
const recipientV2BaseStatsPeopleData=statsPeopleData;
statsPeopleData=function(kind,s=statsSurvey(),full=false){
 if(!s||!surveyHasResolvedRecipientObjects(s))return recipientV2BaseStatsPeopleData(kind,s,full);
 const snapshot=statsSnapshot(s),date=isDailySurvey(s)?snapshot.date:'',records=surveyKnownInternalAnswerRecords(s,date),submittedState=surveySubmittedPersonState(s,date,snapshot.internalDone),submittedByPerson=new Map();records.forEach(record=>{if(record.personId&&!submittedByPerson.has(record.personId))submittedByPerson.set(record.personId,record)});submittedState.personIds.forEach(personId=>{if(!submittedByPerson.has(personId))submittedByPerson.set(personId,{personId,submittedAt:'—'})});
 if(kind==='submitted'){const questions=statsQuestions(s);return [...submittedByPerson.entries()].map(([personId,record],index)=>{const person=recipientStatsMeta(s,personId,record),fallback=statsAnswerValues(questions,person,index);return{...person,responseId:record.id||`${String(s.id).toUpperCase()}-${String(record.submittedAt||date||'').slice(0,10).replaceAll('-','')}-${String(index+1).padStart(6,'0')}`,submittedAt:record.submittedAt||date||'—',status:'已提交',answers:storedResponseValues(questions,record,fallback)}})}
 if(submittedState.anonymousCount>0)return[];
 const assignments=syncSurveyRecipientAssignments(s,date||beijingDateKey());return assignments.filter(row=>row.eligibleNow&&!submittedByPerson.has(row.personId)&&row.progressStatus!=='submitted').map(row=>recipientStatsMeta(s,row.personId,row))
};

function clearRecipientPickerState(){state.recipientPickerDraft=null;state.recipientPickerCategory='';state.recipientPickerMode='';state.recipientPickerSearch='';state.recipientPickerGroupSearch='';state.recipientPickerPersonSearch='';state.recipientPickerSchoolType='';state.recipientTab=''}
function beginRecipientPicker(category,mode){
 if(!recipientOverviewTabs().some(tab=>tab[0]===category))return;
 const entries=recipientItemsForCategory(category).filter(item=>!(category==='school'&&item.requiresReselection)).map(item=>[item._selectionKey,recipientDeepClone(item)]);
 state.recipientPickerDraft=new Map(entries);state.recipientPickerCategory=category;state.recipientPickerMode=mode;state.recipientPickerSearch='';state.recipientPickerGroupSearch='';state.recipientPickerPersonSearch='';state.recipientPickerSchoolType='';state.recipientTab=category;
 if(category==='workgroup'&&!recipientWorkgroupLeaf(state.recipientWorkgroupId))state.recipientWorkgroupId=recipientAllWorkgroupLeaves()[0]?.id||'';
 recipientTrack('recipient_picker_open',{category,source:mode,module_selected_count:recipientCategoryCount(category,state.recipientPickerDraft)})
}
function discardRecipientPicker(source='cancel',rerender=true){const category=state.recipientPickerCategory;if(state.recipientPickerDraft)recipientTrack('recipient_picker_cancel',{category,source,module_selected_count:recipientCategoryCount(category,state.recipientPickerDraft)});clearRecipientPickerState();if(rerender)renderShell()}
function commitRecipientPicker(){
 const category=state.recipientPickerCategory,mode=state.recipientPickerMode,draft=state.recipientPickerDraft;if(!draft)return;
 [...state.recipients.entries()].forEach(([key,item])=>{if(recipientItemCategory(item)===category)state.recipients.delete(key)});draft.forEach((item,key)=>state.recipients.set(key,recipientDeepClone(item)));
 const count=recipientCategoryCount(category);refreshRecipientContractState();recipientTrack('recipient_picker_confirm',{category,source:mode,module_selected_count:count});clearRecipientPickerState();
 if(mode==='mobile'){state.page='mobile/recipients';location.replace('#mobile/recipients')}else renderShell()
}
function recipientDraftHas(category,id){return Boolean(state.recipientPickerDraft?.has(recipientSelectionKey(category,id)))}
function recipientDraftScopeHas(category,id){return Boolean(state.recipientPickerDraft?.has(recipientScopeSelectionKey(category,id)))}
function recipientPersonValue(category,person,scopeId=''){const workgroup=category==='workgroup'?recipientWorkgroupById(scopeId||state.recipientWorkgroupId):null;return{id:person.personId,personId:person.personId,name:person.name,count:1,category,departmentId:person.departmentId||'',departmentName:person.departmentName||'',position:person.position||'',status:'active',level:'person',workgroupIds:workgroup?[workgroup.id]:[],workgroupNames:workgroup?[workgroup.name]:[]}}
function setDraftDynamicScope(category,scopeId,checked){const definition=recipientScopeDefinition(category,scopeId),members=recipientScopeMembers(category,scopeId),selectable=Boolean(definition)&&!(category==='department'&&!definition.isLeaf)&&members.length>0,key=recipientScopeSelectionKey(category,scopeId);if(!selectable)return;if(checked){members.forEach(person=>state.recipientPickerDraft.delete(recipientSelectionKey(category,person.personId||person.id)));const value={id:scopeId,scopeId,name:definition.name,category,level:'scope',scopeType:category,selectionMode:'dynamic',count:members.length};if(category==='department')Object.assign(value,{departmentId:scopeId,departmentNameSnapshot:definition.name});else Object.assign(value,{workgroupId:scopeId,workgroupNameSnapshot:definition.name});state.recipientPickerDraft.set(key,value)}else{state.recipientPickerDraft.delete(key);members.forEach(person=>state.recipientPickerDraft.delete(recipientSelectionKey(category,person.personId||person.id)))}recipientTrack(checked?'recipient_scope_select':'recipient_scope_unselect',{category,scope_type:category,scope_id:scopeId,selection_mode:'dynamic',resolved_person_count:members.length,module_selected_count:recipientCategoryCount(category,state.recipientPickerDraft)})}
function convertDraftScopeToPeople(category,scopeId,excludedPersonId){const members=recipientScopeMembers(category,scopeId),key=recipientScopeSelectionKey(category,scopeId);state.recipientPickerDraft.delete(key);members.forEach(person=>state.recipientPickerDraft.delete(recipientSelectionKey(category,person.personId||person.id)));members.filter(person=>(person.personId||person.id)!==excludedPersonId).forEach(person=>state.recipientPickerDraft.set(recipientSelectionKey(category,person.personId||person.id),recipientPersonValue(category,person,scopeId)));recipientTrack('recipient_scope_convert_to_people',{category,scope_type:category,scope_id:scopeId,person_id:excludedPersonId,selection_mode:'explicit_people',resolved_person_count:members.length,converted_person_count:Math.max(0,members.length-1),module_selected_count:recipientCategoryCount(category,state.recipientPickerDraft)})}
function removeDraftPersonEverywhere(category,personId){const scopes=[...state.recipientPickerDraft.values()].filter(item=>isDynamicRecipientScope(item)&&recipientItemCategory(item)===category&&recipientScopeMembers(category,recipientScopeId(item)).some(person=>(person.personId||person.id)===personId));scopes.forEach(scope=>convertDraftScopeToPeople(category,recipientScopeId(scope),personId));state.recipientPickerDraft.delete(recipientSelectionKey(category,personId))}
function setDraftPerson(category,person,checked,scopeId=''){const key=recipientSelectionKey(category,person.personId),activeScope=scopeId&&recipientDraftScopeHas(category,scopeId);if(!checked&&activeScope)convertDraftScopeToPeople(category,scopeId,person.personId);else if(checked)state.recipientPickerDraft.set(key,recipientPersonValue(category,person,scopeId));else state.recipientPickerDraft.delete(key);recipientTrack(checked?'recipient_person_select':'recipient_person_unselect',{category,person_id:person.personId,department_id:category==='department'?scopeId:'',workgroup_id:category==='workgroup'?scopeId:'',module_selected_count:recipientCategoryCount(category,state.recipientPickerDraft)})}
function setDraftSchool(school,checked){const key=recipientSelectionKey('school',school.id);if(checked)state.recipientPickerDraft.set(key,{id:school.id,schoolId:school.id,name:school.name,type:school.type,count:school.staffCount,staffCount:school.staffCount,category:'school',level:'school',selectionMode:'all_staff'});else state.recipientPickerDraft.delete(key);recipientTrack(checked?'recipient_school_select':'recipient_school_unselect',{category:'school',school_id:school.id,module_selected_count:recipientCategoryCount('school',state.recipientPickerDraft)})}
function genericRecipientGroup(category,id){return (RECIPIENT_DATA[state.portal]?.[category]||[]).find(group=>group.id===id)}
function genericRecipientChild(category,id){for(const group of RECIPIENT_DATA[state.portal]?.[category]||[]){const child=(group.children||[]).find(value=>value[0]===id);if(child)return{group,id:child[0],name:child[1],count:child[2]}}return null}
function setDraftGeneric(category,id,parent,checked){
 if(!parent){const group=genericRecipientGroup(category,id);if(!group)return;const groupKey=recipientSelectionKey(category,id);(group.children||[]).forEach(child=>state.recipientPickerDraft.delete(recipientSelectionKey(category,child[0])));if(checked)state.recipientPickerDraft.set(groupKey,{id:group.id,name:group.name,count:group.count,category,level:'group',excludedChildIds:[]});else state.recipientPickerDraft.delete(groupKey);return}
 const child=genericRecipientChild(category,id);if(!child)return;const groupKey=recipientSelectionKey(category,parent),childKey=recipientSelectionKey(category,id),groupValue=state.recipientPickerDraft.get(groupKey);
 if(groupValue){const excluded=new Set(groupValue.excludedChildIds||[]);checked?excluded.delete(id):excluded.add(id);if(excluded.size>=(child.group.children||[]).length)state.recipientPickerDraft.delete(groupKey);else{groupValue.excludedChildIds=[...excluded];groupValue.count=Math.max(0,child.group.count-(child.group.children||[]).filter(value=>excluded.has(value[0])).reduce((sum,value)=>sum+value[2],0));state.recipientPickerDraft.set(groupKey,groupValue)}return}
 if(checked)state.recipientPickerDraft.set(childKey,{id:child.id,name:child.name,count:child.count,category,parent,level:'child'});else state.recipientPickerDraft.delete(childKey)
}

function recipientModuleMarkupV2([category,label]){
 const items=recipientDisplayItemsForCategory(category),count=recipientCategoryCount(category),tags=items.map(item=>{const invalid=item.requiresReselection||recipientScopeIsInvalid(item),scope=isDynamicRecipientScope(item),scopeCount=scope&&!invalid?recipientScopeMembers(item.scopeType||category,recipientScopeId(item)).length:0,labelText=invalid?`${item.name}（范围已失效，请重新选择）`:item.name;return `<span class="${invalid?'needs-reselection':''} ${scope?'scope-recipient':''}">${esc(labelText)}${scope&&!invalid?`<small>当前 ${scopeCount} 人</small>`:''}<button type="button" data-remove-recipient="${esc(item._selectionKey)}" aria-label="移除${esc(item.name)}">×</button></span>`}).join('');
 return `<article class="recipient-overview-module" data-recipient-module="${category}"><header><div><h3>${esc(label)}</h3></div><div class="recipient-module-actions"><strong class="recipient-module-count" data-module-count="${category}">已选择 ${count} 人</strong><button type="button" data-open-recipient-category="${category}">添加人员</button></div></header><div class="recipient-module-selection">${tags?`<div class="recipient-module-tags">${tags}</div>`:'<span class="recipient-module-empty">暂未选择</span>'}</div></article>`
}
function recipientOverviewMarkupV2(){return `<div class="recipient-overview-list">${recipientOverviewTabs().map(recipientModuleMarkupV2).join('')}</div>`}
function departmentFilteredGroups(){
 const keyword=state.recipientPickerSearch.trim(),groups=DEPARTMENT_PEOPLE[state.portal]||[],byId=new Map(groups.map(group=>[group.id,group])),childrenOf=id=>groups.filter(group=>group.parentId===id),direct=new Set(),visible=new Set(),includeDescendants=id=>childrenOf(id).forEach(child=>{visible.add(child.id);includeDescendants(child.id)});
 groups.forEach(group=>{const people=recipientChildren(group.id);if(!keyword||group.name.includes(keyword)||people.some(person=>[person.name,person.departmentName].join(' ').includes(keyword)))direct.add(group.id)});direct.forEach(id=>{visible.add(id);let parent=byId.get(id)?.parentId;while(parent){visible.add(parent);parent=byId.get(parent)?.parentId}if(keyword&&byId.get(id)?.name.includes(keyword))includeDescendants(id)});
 const rows=[],walk=(parentId='',depth=0)=>childrenOf(parentId).forEach(group=>{if(keyword&&!visible.has(group.id))return;const allPeople=recipientChildren(group.id),departmentMatch=!keyword||group.name.includes(keyword),people=!keyword||departmentMatch?allPeople:allPeople.filter(person=>[person.name,person.departmentName].join(' ').includes(keyword));rows.push({...group,allPeople,people,departmentMatch,depth});if(childrenOf(group.id).length&&(keyword||recipientExpanded(group.id,true)))walk(group.id,depth+1)});walk();return rows
}
function departmentFilteredPeople(){const unique=new Map();departmentFilteredGroups().forEach(group=>group.people.forEach(person=>{if(!unique.has(person.personId))unique.set(person.personId,person)}));return [...unique.values()]}
function departmentPickerMarkup(mobile=false){
 const groups=departmentFilteredGroups(),keyword=state.recipientPickerSearch.trim(),people=departmentFilteredPeople(),allSelected=Boolean(people.length)&&people.every(person=>recipientPersonCovered('department',person.personId,state.recipientPickerDraft));
 const rows=groups.map(group=>{const open=keyword?true:recipientExpanded(group.id,group.isLeaf?!mobile:true),members=group.allPeople,selectable=group.isLeaf&&members.length>0,hasDepartmentChildren=(DEPARTMENT_PEOPLE[state.portal]||[]).some(child=>child.parentId===group.id),children=group.people.length?group.people.map(person=>`<label class="${mobile?'mobile-recipient-child':'recipient-row'} department-person-row" data-picker-person-row="${person.personId}"><input type="checkbox" data-picker-person="${person.personId}" data-picker-person-scope="${group.id}" ${recipientPersonCovered('department',person.personId,state.recipientPickerDraft)?'checked':''}><span>${esc(person.name)}</span></label>`).join(''):'<div class="recipient-department-empty">该部门暂无可选人员</div>',scopeState=recipientScopeState('department',group.id,state.recipientPickerDraft),selector=group.isLeaf?`<label class="recipient-department-scope ${selectable?'':'is-disabled'}"><input type="checkbox" data-picker-dynamic-scope="department" data-picker-scope-id="${group.id}" ${scopeState.checked?'checked':''} ${selectable?'':'disabled'}><span class="recipient-department-label"><b>${esc(group.name)}</b><small>${members.length} 名可选人员</small></span></label>`:`<div class="recipient-department-label"><b>${esc(group.name)}</b><small>下级部门</small></div>`,toggle=hasDepartmentChildren||group.isLeaf?`<button type="button" class="${mobile?'':'recipient-expander'}" data-picker-toggle-department="${group.id}" aria-label="${open?'收起':'展开'}${esc(group.name)}">${mobile?`${open?'收起':'下级'}　›`:(open?'⌄':'›')}</button>`:'';return `<article class="${mobile?'mobile-recipient-group':'recipient-group department-group'} ${open?'open expanded':''} ${group.isLeaf?'is-leaf':'is-branch'}" style="--department-depth:${group.depth}" data-picker-department="${group.id}"><div class="${mobile?'mobile-recipient-row':'recipient-parent-row'} department-group-row">${toggle}${selector}</div>${group.isLeaf?`<div class="${mobile?'mobile-recipient-children ':''}recipient-children ${open?'show':''}">${children}</div>`:''}</article>`}).join('');
 return `<div class="recipient-picker-filters"><div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-search" type="text" maxlength="50" value="${esc(state.recipientPickerSearch)}" placeholder="${mobile?'请输入姓名或部门':'搜索姓名或部门'}"></div></div>${mobile?`<label class="mobile-recipient-select-all"><input type="checkbox" data-picker-department-all ${allSelected?'checked':''} ${people.length?'':'disabled'}><span>全选当前结果</span></label>`:'<div class="recipient-table-head person-head name-only"><span>人员姓名</span></div>'}<div class="${mobile?'mobile-recipient-list':'recipient-tree pc-recipient-tree'}">${rows||'<div class="recipient-filter-empty"><b>未找到符合条件的人员</b><span>请调整姓名或部门关键词</span></div>'}</div>`
}
function filteredBureauSchools(){const keyword=state.recipientPickerSearch.trim(),type=state.recipientPickerSchoolType;return RECIPIENT_DATA.bureau.school.filter(school=>(!keyword||school.name.includes(keyword))&&(!type||school.type===type))}
function schoolPickerMarkup(mobile=false){
 const schools=filteredBureauSchools(),allSelected=Boolean(schools.length)&&schools.every(school=>recipientDraftHas('school',school.id)),filters=`<div class="recipient-picker-filters school"><div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-search" type="text" maxlength="50" value="${esc(state.recipientPickerSearch)}" placeholder="${mobile?'请输入学校名称':'搜索学校名称'}"></div><select id="recipient-picker-school-type" class="${mobile?'mobile-school-filter':'select'}"><option value="">全部学校类型</option>${['小学','初中','九年一贯制'].map(type=>`<option value="${type}" ${state.recipientPickerSchoolType===type?'selected':''}>${type}</option>`).join('')}</select></div>`;
	 const rows=schools.map(school=>`<label class="${mobile?'mobile-school-direct-row':'recipient-school-direct-row'}" data-picker-school-row="${school.id}"><input type="checkbox" data-picker-school="${school.id}" ${recipientDraftHas('school',school.id)?'checked':''}><span><b>${esc(school.name)}</b></span><em>${school.staffCount} 名教职工</em></label>`).join('');
	 return `${filters}${mobile?`<label class="mobile-recipient-select-all"><input type="checkbox" data-picker-school-all ${allSelected?'checked':''} ${schools.length?'':'disabled'}><span>全选当前结果</span></label>`:'<div class="recipient-table-head school-direct-head"><span>学校名称</span><span>教职工人数</span></div>'}<div class="${mobile?'mobile-recipient-list':'recipient-school-direct-list'}">${rows||'<div class="recipient-filter-empty"><b>未找到符合条件的学校</b><span>请调整名称或学校类型</span></div>'}</div>`
}
function workgroupTreeMarkup(mobile=false){
 const keyword=state.recipientPickerGroupSearch.trim(),renderLeaf=(leaf,depth=0,force=false)=>{if(keyword&&!force&&!leaf.name.includes(keyword))return'';const active=leaf.id===state.recipientWorkgroupId,members=recipientWorkgroupMembers(leaf.id),disabled=!members.length,rowClass=mobile?'mobile-workgroup-leaf-row':'recipient-workgroup-leaf-row';return `<div class="${rowClass} ${active?'active':''} ${disabled?'is-disabled':''}" style="--tree-depth:${depth}"><button type="button" class="${mobile?'mobile-workgroup-node':'recipient-workgroup-node'}" data-workgroup-node="${leaf.id}"><span>${esc(leaf.name)}</span><em>${members.length} 人　›</em></button></div>`};
 const nodes=RECIPIENT_WORKGROUP_TREE_V2.map(node=>{if(node.children?.length){const parentMatch=node.name.includes(keyword),children=node.children.map(child=>renderLeaf(child,1,parentMatch)).join('');if(keyword&&!parentMatch&&!children)return'';const open=keyword?true:recipientExpanded(node.id,true);return `<section class="recipient-workgroup-branch ${open?'open':''}"><button type="button" class="recipient-workgroup-parent" data-workgroup-parent-toggle="${node.id}"><span>${open?'⌄':'›'}　${esc(node.name)}</span></button><div class="recipient-workgroup-children ${open?'show':''}">${children}</div></section>`}return renderLeaf(node,0)}).join('');
 return nodes||'<div class="recipient-filter-empty"><b>未找到符合条件的工作组</b><span>请调整工作组名称</span></div>'
}
function workgroupMemberMarkup(mobile=false){
 const group=recipientWorkgroupLeaf(state.recipientWorkgroupId),allMembers=recipientWorkgroupMembers(group?.id),keyword=state.recipientPickerPersonSearch.trim(),visibleMembers=allMembers.filter(person=>!keyword||person.name.includes(keyword)),selectedCount=allMembers.filter(person=>recipientPersonCovered('workgroup',person.personId,state.recipientPickerDraft)).length,allSelected=Boolean(allMembers.length)&&selectedCount===allMembers.length;
 const rows=visibleMembers.map(person=>`<label class="${mobile?'mobile-recipient-child':'recipient-workgroup-person'}" data-workgroup-person-row="${person.personId}"><input type="checkbox" data-picker-workgroup-person="${person.personId}" data-picker-person-scope="${group?.id||''}" ${recipientPersonCovered('workgroup',person.personId,state.recipientPickerDraft)?'checked':''}><span>${esc(person.name)}</span></label>`).join('');
 return `<div class="recipient-workgroup-panel-head"><div><h4>${esc(group?.name||'工作组')}</h4><span>${allMembers.length} 名可选人员</span></div></div><div class="recipient-picker-filters"><div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-person-search" type="text" maxlength="50" value="${esc(state.recipientPickerPersonSearch)}" placeholder="搜索人员姓名"></div></div><label class="${mobile?'mobile-recipient-select-all':'recipient-workgroup-select-all'}"><input type="checkbox" data-workgroup-select-all ${allSelected?'checked':''} ${allMembers.length?'':'disabled'}><span>全选当前成员</span></label><div class="${mobile?'mobile-recipient-list':'recipient-workgroup-person-list'}">${rows||(allMembers.length?'<div class="recipient-filter-empty"><b>未找到符合条件的人员</b><span>请调整人员姓名</span></div>':'<div class="recipient-filter-empty"><b>该工作组暂无可选人员</b><span>请选择其他工作组</span></div>')}</div>`
}
function workgroupPickerMarkup(){return `<div class="recipient-workgroup-layout"><aside class="recipient-workgroup-tree"><div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-group-search" type="text" maxlength="50" value="${esc(state.recipientPickerGroupSearch)}" placeholder="搜索工作组名称"></div><div class="recipient-workgroup-tree-list">${workgroupTreeMarkup(false)}</div></aside><section class="recipient-workgroup-panel">${workgroupMemberMarkup(false)}</section></div>`}
function genericFilteredGroups(category){const keyword=state.recipientPickerSearch.trim();return (RECIPIENT_DATA[state.portal]?.[category]||[]).map(group=>{const groupMatch=group.name.includes(keyword),children=!keyword||groupMatch?group.children:(group.children||[]).filter(child=>child[1].includes(keyword));return{...group,children,groupMatch}}).filter(group=>!keyword||group.groupMatch||group.children.length)}
function genericGroupState(category,group){const groupValue=state.recipientPickerDraft.get(recipientSelectionKey(category,group.id)),selectedChildren=(group.children||[]).filter(child=>recipientDraftHas(category,child[0])).length,excluded=groupValue?.excludedChildIds?.length||0;return{checked:Boolean(groupValue)&&!excluded,indeterminate:Boolean(excluded||(!groupValue&&selectedChildren)),groupValue}}
function genericPickerMarkup(category,mobile=false){
 const groups=genericFilteredGroups(category),keyword=state.recipientPickerSearch.trim(),label=category==='parent'?'家长':'班级';const rows=groups.map(group=>{const stateValue=genericGroupState(category,group),open=keyword?true:recipientExpanded(group.id,!mobile),children=(group.children||[]).map(child=>{const selected=stateValue.groupValue?!stateValue.groupValue.excludedChildIds?.includes(child[0]):recipientDraftHas(category,child[0]);return `<label class="${mobile?'mobile-recipient-child':'recipient-row'}"><input type="checkbox" data-picker-generic="${child[0]}" data-picker-parent="${group.id}" ${selected?'checked':''}><span>${esc(child[1])}</span><em>${child[2]} 人</em></label>`}).join('');return `<article class="${mobile?'mobile-recipient-group':'recipient-group'} ${open?'open expanded':''}"><div class="${mobile?'mobile-recipient-row':'recipient-parent-row'}"><button type="button" class="${mobile?'':'recipient-expander'}" data-picker-toggle-department="${group.id}">${mobile?`${open?'收起':'下级'}　›`:(open?'⌄':'›')}</button><label class="generic-recipient-parent"><input type="checkbox" data-picker-generic="${group.id}" ${stateValue.checked?'checked':''}><span>${esc(group.name)}</span><em>${group.count} 人</em></label></div><div class="${mobile?'mobile-recipient-children ':''}recipient-children ${open?'show':''}">${children}</div></article>`}).join('');
 return `<div class="recipient-picker-filters"><div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-search" type="text" maxlength="50" value="${esc(state.recipientPickerSearch)}" placeholder="搜索${label}或年级"></div></div><div class="${mobile?'mobile-recipient-list':'recipient-tree pc-recipient-tree'}">${rows||`<div class="recipient-filter-empty"><b>未找到符合条件的${label}</b><span>请调整搜索条件</span></div>`}</div>`
}
function recipientPickerBody(category,mobile=false){if(category==='department')return departmentPickerMarkup(mobile);if(category==='workgroup')return mobile?workgroupTreeMarkup(true):workgroupPickerMarkup();if(category==='school')return schoolPickerMarkup(mobile);return genericPickerMarkup(category,mobile)}
function renderPcRecipientPickerModal(){
 const root=$('#modal');if(!root||!state.recipientPickerDraft||state.recipientPickerMode!=='pc')return;const category=state.recipientPickerCategory,label=recipientOverviewTabs().find(tab=>tab[0]===category)?.[1]||'接收人员',meta=recipientTabMeta()[category];
 root.className='modal-mask show recipient-picker-mask';root.innerHTML=`<div class="modal recipient-picker-modal" data-recipient-picker="${category}"><header class="recipient-picker-head"><div><h3>添加${esc(label)}</h3><p>${esc(meta?.[1]||'选择接收对象')}</p></div><div class="recipient-picker-tools">${prdButton('recipient-picker','overlay','overlay-prd-trigger')}<button type="button" class="recipient-picker-close" data-picker-cancel aria-label="关闭">×</button></div></header><section class="recipient-picker-body">${recipientPickerBody(category,false)}</section><div class="modal-actions recipient-picker-actions"><span data-picker-module-total>已选择 ${recipientCategoryCount(category,state.recipientPickerDraft)} 人</span><div><button type="button" class="btn" data-picker-cancel>取消</button><button type="button" class="btn primary" data-picker-confirm>确定</button></div></div></div>`;
 root.onclick=event=>{if(event.target===root)discardRecipientPicker('mask')};bindPrdButton($('.overlay-prd-trigger',root));bindRecipientPickerControls(root)
}
function mobileRecipientFooter(category,buttonText='确定',attribute='data-picker-confirm'){return `<footer class="mobile-recipient-footer module-only"><div><b>已选择 ${recipientCategoryCount(category,state.recipientPickerDraft)} 人</b><span>${esc(recipientOverviewTabs().find(tab=>tab[0]===category)?.[1]||'当前模块')}</span></div><button type="button" ${attribute}>${buttonText}</button></footer>`}
function mobileWorkgroupTreePage(){return `${statsMobileHead('选择工作组','#mobile/recipients')}<section class="mobile-recipient-page mobile-recipient-picker-page"><div class="mobile-recipient-search"><input id="recipient-picker-group-search" maxlength="50" value="${esc(state.recipientPickerGroupSearch)}" placeholder="搜索工作组名称"></div><div class="mobile-workgroup-tree">${workgroupTreeMarkup(true)}</div></section>${mobileRecipientFooter('workgroup')}`}
function mobileWorkgroupPeoplePage(groupId){state.recipientWorkgroupId=recipientWorkgroupLeaf(groupId)?.id||state.recipientWorkgroupId;const group=recipientWorkgroupLeaf(state.recipientWorkgroupId);return `${statsMobileHead(group?.name||'工作组','#mobile/recipients/workgroup')}<section class="mobile-recipient-page mobile-recipient-picker-page mobile-workgroup-people">${workgroupMemberMarkup(true)}</section>${mobileRecipientFooter('workgroup','完成本组','data-workgroup-leaf-done')}`}
function mobileCategoryPickerPage(category){const label=recipientOverviewTabs().find(tab=>tab[0]===category)?.[1]||'选择成员';return `${statsMobileHead(`选择${label}`,'#mobile/recipients')}<section class="mobile-recipient-page mobile-recipient-picker-page">${recipientPickerBody(category,true)}</section>${mobileRecipientFooter(category)}`}
function ensureMobileRecipientPicker(category){if(!state.recipientPickerDraft||state.recipientPickerMode!=='mobile'||state.recipientPickerCategory!==category)beginRecipientPicker(category,'mobile')}
const RECIPIENT_OVERVIEW_NEXT_LABEL='下一步';
function currentObjectStepV2(){const rule=state.portal==='school'?'内部部门、家长、班级均为非必填；纯外部问卷可进入下一步并开启外部填写。':'内部部门、工作组、学校可组合选择；学校被选中后覆盖该校全部有效教职工。';return `<div class="form-card pc-recipient-card recipient-overview-card"><div class="section-title">选择接收人员</div><p class="recipient-overview-rule">${rule}</p>${recipientOverviewMarkupV2()}<div class="footer-actions pc-recipient-actions"><button class="btn" data-action="prev">上一步</button><button class="btn primary" data-action="next">下一步</button></div></div>`}
function currentMobileRecipientsPageV2(){
 const parts=state.page.split('/'),category=parts[2];if(category){ensureMobileRecipientPicker(category);if(category==='workgroup')return parts[3]?mobileWorkgroupPeoplePage(parts[3]):mobileWorkgroupTreePage();return mobileCategoryPickerPage(category)}
 clearRecipientPickerState();const rule=state.portal==='school'?'三个模块均为非必填；纯外部问卷可进入收集设置并开启外部填写。':'可组合选择内部部门、工作组和学校。';return `${statsMobileHead('选择成员',state.recipientReturnPage||'#mobile/create')}<section class="mobile-recipient-page mobile-recipient-overview"><div class="recipient-overview-intro"><b>接收对象</b><span>${rule}</span></div>${recipientOverviewMarkupV2()}</section><footer class="mobile-recipient-footer overview-only"><a href="#mobile/settings" data-mobile-recipient-overview-next>${RECIPIENT_OVERVIEW_NEXT_LABEL}</a></footer>`
}
objectStep=currentObjectStepV2;
mobileRecipientsPage=currentMobileRecipientsPageV2;

function rerenderRecipientPicker(focusId=''){renderShell();if(focusId)requestAnimationFrame(()=>{const input=$(`#${focusId}`);if(input){input.focus();const end=input.value.length;input.setSelectionRange?.(end,end)}})}
function bindRecipientPickerControls(root=document){
 $$('[data-picker-cancel]',root).forEach(button=>button.onclick=()=>discardRecipientPicker('button'));
 $$('[data-picker-confirm]',root).forEach(button=>button.onclick=commitRecipientPicker);
	 $$('[data-picker-dynamic-scope]',root).forEach(input=>{const category=input.dataset.pickerDynamicScope,scopeId=input.dataset.pickerScopeId,scopeState=recipientScopeState(category,scopeId,state.recipientPickerDraft);input.indeterminate=scopeState.indeterminate;input.setAttribute('aria-checked',scopeState.indeterminate?'mixed':String(scopeState.checked));input.onchange=()=>{setDraftDynamicScope(category,scopeId,input.checked);rerenderRecipientPicker()}});
 $$('[data-picker-person]',root).forEach(input=>input.onchange=()=>{const scopeId=input.dataset.pickerPersonScope||'',person=recipientScopeMembers('department',scopeId).find(value=>value.personId===input.dataset.pickerPerson)||recipientDirectoryPerson(input.dataset.pickerPerson);if(person)setDraftPerson('department',person,input.checked,scopeId);rerenderRecipientPicker()});
 $$('[data-picker-workgroup-person]',root).forEach(input=>input.onchange=()=>{const scopeId=input.dataset.pickerPersonScope||state.recipientWorkgroupId,person=recipientScopeMembers('workgroup',scopeId).find(value=>value.personId===input.dataset.pickerWorkgroupPerson)||recipientDirectoryPerson(input.dataset.pickerWorkgroupPerson);if(person)setDraftPerson('workgroup',person,input.checked,scopeId);rerenderRecipientPicker()});
 $$('[data-picker-school]',root).forEach(input=>input.onchange=()=>{const school=RECIPIENT_DATA.bureau.school.find(item=>item.id===input.dataset.pickerSchool);if(school)setDraftSchool(school,input.checked);rerenderRecipientPicker()});
 $$('[data-picker-generic]',root).forEach(input=>{const parent=input.dataset.pickerParent||'',group=!parent?genericRecipientGroup(state.recipientPickerCategory,input.dataset.pickerGeneric):null;if(group){const value=genericGroupState(state.recipientPickerCategory,group);input.indeterminate=value.indeterminate}input.onchange=()=>{setDraftGeneric(state.recipientPickerCategory,input.dataset.pickerGeneric,parent,input.checked);recipientTrack(input.checked?'recipient_scope_select':'recipient_scope_unselect',{category:state.recipientPickerCategory,object_id:input.dataset.pickerGeneric,module_selected_count:recipientCategoryCount(state.recipientPickerCategory,state.recipientPickerDraft)});rerenderRecipientPicker()}});
 $('#recipient-picker-search',root)?.addEventListener('input',event=>{state.recipientPickerSearch=event.target.value.slice(0,50);recipientTrack('recipient_search',{category:state.recipientPickerCategory,search_keyword:state.recipientPickerSearch,module_selected_count:recipientCategoryCount(state.recipientPickerCategory,state.recipientPickerDraft)});rerenderRecipientPicker('recipient-picker-search')});
 $('#recipient-picker-group-search',root)?.addEventListener('input',event=>{state.recipientPickerGroupSearch=event.target.value.slice(0,50);recipientTrack('recipient_workgroup_search',{category:'workgroup',search_keyword:state.recipientPickerGroupSearch,module_selected_count:recipientCategoryCount('workgroup',state.recipientPickerDraft)});rerenderRecipientPicker('recipient-picker-group-search')});
 $('#recipient-picker-person-search',root)?.addEventListener('input',event=>{state.recipientPickerPersonSearch=event.target.value.slice(0,50);recipientTrack('recipient_search',{category:'workgroup',workgroup_id:state.recipientWorkgroupId,search_keyword:state.recipientPickerPersonSearch,module_selected_count:recipientCategoryCount('workgroup',state.recipientPickerDraft)});rerenderRecipientPicker('recipient-picker-person-search')});
 $('#recipient-picker-school-type',root)?.addEventListener('change',event=>{state.recipientPickerSchoolType=event.target.value;rerenderRecipientPicker()});
 $$('[data-picker-toggle-department]',root).forEach(button=>button.onclick=()=>{const id=button.dataset.pickerToggleDepartment,open=recipientExpanded(id,state.recipientPickerMode==='pc');state.recipientExpansion.set(id,!open);if(state.recipientPickerCategory==='department')recipientTrack('recipient_department_toggle',{category:'department',department_id:id,expanded:!open,module_selected_count:recipientCategoryCount('department',state.recipientPickerDraft)});rerenderRecipientPicker()});
 $$('[data-workgroup-parent-toggle]',root).forEach(button=>button.onclick=()=>{const id=button.dataset.workgroupParentToggle;state.recipientExpansion.set(id,!recipientExpanded(id,true));rerenderRecipientPicker()});
 $$('[data-workgroup-node]',root).forEach(button=>button.onclick=()=>{state.recipientWorkgroupId=button.dataset.workgroupNode;state.recipientPickerPersonSearch='';recipientTrack('recipient_workgroup_switch',{category:'workgroup',workgroup_id:state.recipientWorkgroupId,module_selected_count:recipientCategoryCount('workgroup',state.recipientPickerDraft)});if(state.recipientPickerMode==='mobile')location.hash=`mobile/recipients/workgroup/${state.recipientWorkgroupId}`;else rerenderRecipientPicker()});
 const departmentAll=$('[data-picker-department-all]',root);if(departmentAll)departmentAll.onchange=()=>{departmentFilteredPeople().forEach(person=>{if(departmentAll.checked)setDraftPerson('department',person,true,person.departmentId);else removeDraftPersonEverywhere('department',person.personId)});recipientTrack(departmentAll.checked?'recipient_person_select_all':'recipient_person_unselect_all',{category:'department',search_keyword:state.recipientPickerSearch,module_selected_count:recipientCategoryCount('department',state.recipientPickerDraft)});rerenderRecipientPicker()};
 const schoolAll=$('[data-picker-school-all]',root);if(schoolAll)schoolAll.onchange=()=>{filteredBureauSchools().forEach(school=>setDraftSchool(school,schoolAll.checked));rerenderRecipientPicker()};
 const workgroupAll=$('[data-workgroup-select-all]',root);if(workgroupAll){const members=recipientWorkgroupMembers(state.recipientWorkgroupId),selected=members.filter(person=>recipientPersonCovered('workgroup',person.personId,state.recipientPickerDraft)).length;workgroupAll.checked=Boolean(members.length)&&selected===members.length;workgroupAll.indeterminate=false;workgroupAll.setAttribute('aria-checked',String(workgroupAll.checked));workgroupAll.onchange=()=>{members.forEach(person=>{if(workgroupAll.checked)setDraftPerson('workgroup',person,true,state.recipientWorkgroupId);else removeDraftPersonEverywhere('workgroup',person.personId)});recipientTrack(workgroupAll.checked?'recipient_person_select_all':'recipient_person_unselect_all',{category:'workgroup',workgroup_id:state.recipientWorkgroupId,module_selected_count:recipientCategoryCount('workgroup',state.recipientPickerDraft)});rerenderRecipientPicker()}};
 $('[data-workgroup-leaf-done]',root)?.addEventListener('click',()=>{location.hash='mobile/recipients/workgroup'});
}
function bindRecipientOverviewV2(){
 $$('[data-open-recipient-category]').forEach(button=>button.onclick=event=>{event.preventDefault();const category=button.dataset.openRecipientCategory,mode=state.preview==='mobile'?'mobile':'pc';beginRecipientPicker(category,mode);if(mode==='mobile')location.hash=`mobile/recipients/${category}`;else renderShell()});
 $$('[data-remove-recipient]').forEach(button=>button.onclick=()=>{const key=button.dataset.removeRecipient,item=state.recipients.get(key),category=item?recipientItemCategory(item):key.split(':')[0];state.recipients.delete(key);refreshRecipientContractState();recipientTrack('recipient_item_remove',{category,object_id:item?.personId||item?.schoolId||item?.id||key,module_selected_count:recipientCategoryCount(category)});renderShell()});
 $('[data-mobile-recipient-overview-next]')?.addEventListener('click',()=>recipientTrack('recipient_selection_confirm',{source:'mobile-overview'}));
 $('[data-recipient-overview]')?.addEventListener('click',()=>{state.recipientReturnPage='#mobile/settings';clearRecipientPickerState()});
 if(state.recipientPickerMode==='mobile'&&state.recipientPickerDraft)bindRecipientPickerControls($('#view'))
}
const recipientV2BaseBind=bind;
bind=function(){recipientV2BaseBind();bindRecipientOverviewV2();if(state.recipientPickerMode==='pc'&&state.recipientPickerDraft)renderPcRecipientPickerModal()};

recipientTrack=function(event,details={}){const category=details.category||state.recipientPickerCategory||'',record={event,portal:state.portal,device:state.preview,category,selected_count:recipientCount(),module_selected_count:category?recipientCategoryCount(category,state.recipientPickerDraft&&category===state.recipientPickerCategory?state.recipientPickerDraft:state.recipients):0,timestamp:formatSystemTime(),...details};window.__recipientEvents=window.__recipientEvents||[];window.__recipientEvents.push(record)};
recipientSelectionError=function(){const items=[...state.recipients.values()],hasLegacySchool=items.some(item=>item.requiresReselection&&!isDynamicRecipientScope(item)),invalidScope=items.find(item=>recipientScopeIsInvalid(item)||isDynamicRecipientScope(item)&&item.requiresReselection),count=recipientCount();if(hasLegacySchool)return'历史学校角色范围已失效，请重新选择学校';if(invalidScope){const scopeType=invalidScope.scopeType||recipientItemCategory(invalidScope),scopeLabel=scopeType==='workgroup'?'工作组':'部门';recipientTrack('recipient_scope_invalid',{category:scopeType,scope_type:scopeType,scope_id:recipientScopeId(invalidScope),resolved_person_count:0});return`已选${scopeLabel}范围已失效，请重新选择`}if(!count&&!state.externalRecipient)return state.portal==='school'?'内部部门、家长、班级至少选择一项，或开启外部填写':'请选择有效接收人员或开启外部填写';return''};

const recipientV2BaseResetCreationState=resetCreationState;
resetCreationState=function(){recipientV2BaseResetCreationState();clearRecipientPickerState();state.recipientPickerSearch='';state.recipientPickerGroupSearch='';state.recipientPickerPersonSearch='';state.recipientPickerSchoolType='';refreshRecipientContractState()};
const recipientV2BaseLoadEditableSurveyState=loadEditableSurveyState,recipientV2BaseLoadSurveyTemplateState=loadSurveyTemplateState;
loadEditableSurveyState=function(s){recipientV2BaseLoadEditableSurveyState(s);state.recipients=normalizeRecipientMap(state.recipients);refreshRecipientContractState();clearRecipientPickerState()};
loadSurveyTemplateState=function(item,editing=false){recipientV2BaseLoadSurveyTemplateState(item,editing);state.recipients=new Map();refreshRecipientContractState();clearRecipientPickerState()};

const recipientV2BaseRoute=route;
route=function(){const next=(location.hash||'#list').slice(1).split('?')[0];if(state.recipientPickerMode==='mobile'&&state.recipientPickerDraft){const prefix=`mobile/recipients/${state.recipientPickerCategory}`;if(!next.startsWith(prefix))discardRecipientPicker('back',false)}else if(state.recipientPickerMode==='pc'&&state.recipientPickerDraft&&next!==state.page)discardRecipientPicker('route_change',false);recipientV2BaseRoute()};
const recipientV2BaseDeviceSwitchPage=deviceSwitchPage;
deviceSwitchPage=function(target){if(state.recipientPickerDraft)discardRecipientPicker('device_switch',false);if(target==='mobile'&&(state.page==='templates/create'||state.page.startsWith('templates/edit/')))return'mobile/templates';if(target==='pc'&&state.page.startsWith('mobile/recipients')){state.step=3;return state.editingSurveyId?`list/edit/${state.editingSurveyId}`:'list/create'}return recipientV2BaseDeviceSwitchPage(target)};
if(!window.__recipientPickerEscapeBound){window.__recipientPickerEscapeBound=true;document.addEventListener('keydown',event=>{if(event.key!=='Escape'||$('#prd-layer')?.classList.contains('show'))return;if(state.recipientPickerMode==='pc'&&state.recipientPickerDraft){event.preventDefault();discardRecipientPicker('escape')}})}

mobileSettingsPage=baseMobileSettingsPage;

PRD_FIELD_GROUPS.recipients=[
 ['接收对象模块','教育局端依次为内部部门、工作组、学校；学校端依次为内部部门、家长、班级。','recipientOverviewTabs()'],
 ['模块计数','各模块固定显示“已选择 N 人”；页面不展示跨模块已选项数或预计人数。','recipientCategoryCount(category)'],
 ['添加人员','PC 打开专用选择弹窗；移动端进入分类子页面。','beginRecipientPicker(category, mode)'],
 ['临时选择','确定后替换当前模块选择；PC 取消、关闭、遮罩、Esc 与移动端返回均放弃本次修改。','state.recipientPickerDraft / commitRecipientPicker()'],
 ['内部部门','非末级部门仅展开；末级部门可整选并保存 dynamic_department，也可展开后逐人选择；空部门不可选。','DEPARTMENT_PEOPLE / departmentPickerMarkup()'],
 ['工作组','固定展示教育质量提升工作组、校园安全工作组、教育数字化工作组；支持整组全选、逐人选择和部分选择半选状态。','RECIPIENT_WORKGROUP_TREE_V2 / workgroupPickerMarkup()'],
 ['学校','学校平铺仅展示学校名称和教职工人数，直选且不下钻；学校类型仅用于筛选，选中即覆盖该校全部有效教职工。','RECIPIENT_DATA.bureau.school[].staffCount'],
 ['选择键与计数','部门动态范围使用 department:scope:{departmentId}；明确人员按 personId 去重，学校按 staffCount 求和。','recipientScopeSelectionKey() / recipientCategoryCount()'],
 ['发布范围','末级部门保存 recipientRules(selectionMode=dynamic_department)，逐人选择保存 explicitPersonIds；工作组继续保存明确人员。','recipientSelectionContract() / selectedRecipientSnapshot()'],
 ['历史兼容','旧草稿或未开始问卷中的学校角色级范围不得自动扩大为整校，编辑时须重新选择学校。','normalizeRecipientMap() / requiresReselection']
];
PRD_FIELD_GROUPS.recipientPicker=[
 ['分类','只读；继承当前模块。','state.recipientPickerCategory'],['部门搜索','最多 50 字，匹配人员姓名或部门名称；命中人员时展示所属部门。','state.recipientPickerSearch'],['部门联动','整选末级部门默认覆盖当前全部有效人员；取消任一人转为明确名单，重新补齐后恢复动态部门。','setDraftDynamicScope() / convertDraftScopeToPeople() / promoteCompleteDepartmentScope()'],['工作组搜索','最多 50 字，仅匹配工作组名称。','state.recipientPickerGroupSearch'],['人员搜索','最多 50 字，仅匹配姓名。','state.recipientPickerPersonSearch'],['学校筛选','按学校名称包含匹配，并支持学校类型筛选。','state.recipientPickerSearch / state.recipientPickerSchoolType'],['成员有效性','仅 status=active 且 canReceive=true 的成员参与显示与动态解析。','recipientScopeMembers()'],['确认与取消','确定提交临时副本；取消类操作不写入正式选择。','commitRecipientPicker() / discardRecipientPicker()']
];
['create-recipients','mobile-recipients'].forEach(key=>{if(PRD_PAGE_RULES[key])PRD_PAGE_RULES[key].fields=prdFields('recipients','recipientPicker')});
PRD_PAGE_RULES['create-recipients'].goal='在 PC 端配置末级部门动态范围、明确人员及其他既有接收对象。';
PRD_PAGE_RULES['mobile-recipients'].goal='在移动端整选末级部门或逐人选择，并与 PC 端保持一致回显。';
PRD_PAGE_RULES['mobile-settings'].goal='配置外部填写、收集方式、开始日期、截止日期和每日提醒规则。';
PRD_PAGE_RULES['all-surveys-detail'].goal='只读查看问卷配置、实际接收数据范围和答卷明细；详情不展示发布渠道。';
PRD_PAGE_RULES['all-surveys-detail'].fields=prdFields('surveyDetail').filter(row=>!['已提交','未提交','外部提交数','完成率'].includes(row[0]));
PRD_OVERLAY_RULES['recipient-picker']={title:'接收人员与动态部门选择',goal:'在 PC 专用弹窗中以临时副本选择当前模块对象，并通过确定提交或取消回滚。',fields:prdFields('recipientPicker','recipients')};
const recipientV2BaseRenderPrdDocument=renderPrdDocument;
function renderRecipientPickerPrd(rule,key,entryType){
 const features=[
  ['模块总览','三类接收对象','教育局端固定为内部部门、工作组、学校；学校端固定为内部部门、家长、班级。','P0','顺序固定'],
  ['模块计数','独立人数','每个模块显示已选择人数，不展示跨模块总数。','P0','部门与工作组按 personId 去重'],
  ['PC 选择','专用弹窗','添加人员打开弹窗；确定替换当前模块，取消、关闭、遮罩或 Esc 放弃修改。','P0','使用临时副本'],
  ['移动选择','分类子页面','模块总览进入分类子页；工作组再进入人员页；确定提交，返回放弃。','P0','人员页返回树保留临时选择'],
  ['内部部门','末级动态选择','非末级部门仅展开；末级部门可整选并动态解析当前有效成员，空部门禁用。','P0','PC、移动端一致'],
  ['部门成员联动','动态与明确名单转换','整选后取消任一人转为剩余明确人员；逐人补齐后自动恢复 dynamic_department。','P0','跨部门同人按 personId 去重'],
  ['工作组','列表与人员选择','固定展示三个工作组；成员页支持搜索、全选本组和逐人选择，部分选择时展示半选。','P0','空组展示明确空态'],
  ['学校','整校教职工','学校平铺仅展示名称和教职工人数，直选且不下钻；学校类型仅用于筛选，选中后按 staffCount 计入全部有效教职工。','P0','不展示学段或学校类型'],
  ['发布范围','动态规则与明确人员','recipientRules 保存动态部门，explicitPersonIds 保存逐人结果；工作组保持明确人员快照。','P0','旧人员快照不升级'],
  ['历史兼容','禁止静默扩围','旧学校角色范围编辑时要求重新选择，不得自动转换为整校教职工。','P0','已发布快照不变']
 ];
	 return `<article class="prd-document"><header class="prd-document-head"><div><small>${entryType==='page'?'页面':'弹窗'}规则 · ${esc(key)}</small><h2>${esc(rule.title)}</h2></div><button type="button" class="prd-close" aria-label="关闭 PRD 规则">×</button></header><aside class="prd-prerequisite" role="note"><strong>末级部门动态接收范围</strong><p>整选末级部门保存 dynamic_department；填写、人数和统计按部门当前有效人员解析，明确人员按 personId 固定。</p><small>工作组继续逐人选择或全选本组，不保存动态范围；旧 recipientSnapshot 人员数据保持固定范围。</small></aside><section><h3>1. 背景与目标</h3><p>${esc(rule.goal)}</p></section><section><h3>2. 用户与使用场景</h3><p>教育局及学校授权人员在 PC 或移动端创建问卷时，可整选末级部门，也可精确到人员。</p></section><section><h3>3. 需求范围</h3><h4>In Scope</h4><p>末级部门动态规则、人员增减、搜索结果全选、PC 与移动端回显、填写资格及统计人数动态解析。</p><h4>Out of Scope</h4><p>组织架构维护、工作组动态化、历史人员快照升级、真实后端接口实现。</p></section><section><h3>4. 功能需求列表</h3>${prdTable(['功能模块','功能点','需求描述','优先级（P0 / P1 / P2）','备注说明'],features)}</section><section><h3>5. 核心流程与交互说明</h3><p>勾选末级部门后默认覆盖其当前全部有效人员；取消任一人员时转换为剩余明确人员，重新补齐全部当前人员后恢复动态部门。确认提交临时副本，取消或返回不修改正式选择。</p>${prdTable(['字段/信息','限制与展示规则','当前原型来源'],rule.fields||[],'prd-field-table')}</section><section><h3>6. 异常场景与边界条件</h3><p>非末级部门仅展开，空部门不可选。停用或 canReceive=false 的人员不参与解析；未答人员离开部门后移出应收，已答人员保留历史答卷与统计贡献；失效部门发布前要求重选。</p></section><section><h3>7. 数据口径与埋点需求</h3><p>动态部门与明确人员按 personId 去重；普通问卷应收为当前有效人员与已答历史人员并集，每日问卷按 collectionDate 冻结历史任务。记录范围选择、范围转人员、自动恢复动态范围、搜索、全选、确认和校验失败。</p></section><section><h3>8. 风险、依赖与限制</h3><p>正式环境依赖稳定 personId、部门层级、成员有效状态及接收权限接口；服务端需在填写与统计时复核动态范围并隔离外部二维码上下文。</p></section><section><h3>9. 验收标准</h3><p>两端 PC 与移动端均仅允许末级部门整选；动态与明确人员转换正确；跨部门重复人员取消不被隐式选回；人员进出后填写资格和人数更新；工作组、学校、家长和班级既有规则不变。</p></section></article>`
}
renderPrdDocument=function(rule,key,entryType){const recipientPage=entryType==='page'&&['create-recipients','mobile-recipients'].includes(key),recipientOverlay=entryType==='overlay'&&key==='recipient-picker';return recipientPage||recipientOverlay?renderRecipientPickerPrd(rule,key,entryType):recipientV2BaseRenderPrdDocument(rule,key,entryType)};
const pcCloudHomeWidget=cloudHomeWidget;
function syncCloudWidgetStats(){syncAllSurveyTemporalStatuses();const c=CONFIG[state.portal],surveys=c.surveys.filter(s=>s.deleted!==1),total=surveys.length,running=surveys.filter(s=>s.status==='running').length;c.stats[0][1]=total;c.stats[1][1]=running;return[['问卷总数',total],['进行中问卷',running]]}
function currentMobileCloudHomeWidget(){
	 const c=CONFIG[state.portal],rows=mobileWidgetSurveys(),metrics=syncCloudWidgetStats(),key='mobile-widget',badge=s=>`<em class="tag ${s.status}">${esc(s.statusText)}</em>`;
	 return `<div class="cloud-mobile-home"><button type="button" class="cloud-mobile-return" data-mobile-widget-return>← 返回主应用</button><header><span>云平台首页 · ${c.name}</span><b>${c.org}</b></header><section class="cloud-mobile-section"><div class="cloud-mobile-title"><div><h2>问卷调研</h2><p>问卷运行统计</p></div>${prdButton(key,'page','cloud-widget-prd-trigger')}</div><div class="cloud-mobile-widget cloud-stats-only" aria-label="问卷调研统计数据"><div class="cloud-stat-grid">${metrics.map(m=>`<div><b>${m[1]}</b><span>${m[0]}</span></div>`).join('')}</div><div class="cloud-mobile-latest"><h3 class="cloud-latest-title">最新问卷</h3>${rows.length?rows.map(s=>`<a class="cloud-mobile-latest-row" data-fill-status="${fillStatusKey(s)}" href="${mobileWidgetSurveyHref(s)}"><b>${esc(s.title)}${badge(s)}</b><span>截止时间：${esc(mobileWidgetDeadline(s))}</span></a>`).join(''):'<div class="cloud-widget-empty">暂无问卷</div>'}</div></div></section><section class="cloud-mobile-placeholder"><h2>常用应用</h2><div></div></section></div>`
}
cloudHomeWidget=function(){syncCloudWidgetStats();return state.preview==='mobile'?currentMobileCloudHomeWidget():pcCloudHomeWidget()}
cloudWidgetRules=function(){return `
	 <section><h3>1. 背景与目标</h3><p>删除教育局端、学校端应用首页模块，在云首页按设备提供精简统计与高频问卷入口。</p></section>
	 <section><h3>2. 用户与使用场景</h3><p>教育局与学校授权用户在 PC 云首页查看组织问卷概览，在移动云首页快速进入本人最新收到的问卷。</p></section>
	 <section><h3>3. 需求范围</h3><h4>In Scope</h4><p>两端首页入口删除、两项统计、PC 最新五条组织问卷、移动端最新一条本人收到的问卷、截止日期、状态标签及对应详情跳转。</p><h4>Out of Scope</h4><p>移动端我的问卷列表排序、问卷创建表单、其他页面时间字段调整及后端接口实现。</p></section>
	 <section><h3>4. 功能需求列表</h3>${prdTable(['功能模块','功能点','需求描述','优先级（P0 / P1 / P2）','备注说明'],[['应用导航','删除首页','删除首页入口；默认进入我的问卷；旧首页地址重定向我的问卷。','P0','两端一致'],['云首页','顶部统计','仅显示问卷总数与进行中问卷，并缩小统计区高度。','P0','未开始不计入进行中'],['PC 云首页','最新五条问卷','最多展示当前组织最新五条已发布问卷，点击进入统计详情。','P0','按创建时间和 ID 倒序'],['移动云首页','最新一条本人问卷','仅展示当前用户收到的最新一条问卷，已填写与未填写均纳入；已填写进入本人答卷查看，未填写进入填写页。','P0','不按填写状态优先']])}</section>
	 <section><h3>5. 核心流程与交互说明</h3><p>PC 展示两项统计与最新五条组织问卷；移动端从“我收到的”问卷中按创建时间倒序取第一条，不区分已填写或未填写，点击后进入对应的本人答卷查看或填写页面。PC“查看更多”进入问卷管理。</p></section>
	 <section><h3>6. 异常场景与边界条件</h3><p>PC 不足五条时按实际数量展示；移动端无本人收到的问卷时展示“暂无问卷”。截止日期缺失展示 —；加载失败和无权限不得显示为零。</p></section>
	 <section><h3>7. 数据口径与埋点需求</h3><p>PC 列表取当前组织未删除且已发布问卷，按创建时间和 ID 倒序最多五条；移动端列表取当前用户收到且可见的问卷，包含已填写和未填写，按创建时间和 ID 倒序仅取一条。问卷总数包含未删除草稿；进行中仅计同步日期状态后 status=running 的问卷。记录 cloud_widget_open、survey_widget_entry_click、prd_rule_open、prd_rule_close；【假设】公共属性包含 portal、device、survey_id、fill_status、entry_target 和 timestamp。</p></section>
	 <section><h3>8. 风险、依赖与限制</h3><p>当前为前端演示数据；正式统计依赖组织权限、个人答卷状态和聚合接口，缓存必须隔离组织、用户及权限范围。生产数据使用独立 deadline 字段，原型兼容已有时间文本。</p></section>
	 <section><h3>9. 验收标准</h3><p>两端无首页菜单，旧地址进入我的问卷；PC 与移动端均仅显示问卷总数和进行中问卷；PC 最新组织问卷不超过五条；移动端仅显示本人收到的最新一条问卷，已填写与未填写均可成为最新项并进入对应页面；空态和截止日期展示正确。</p></section>
`}

/* PRD V1.9: keep every page-level document aligned with the current prototype. */
const PRD_CURRENT_VERSION='V1.9';
const PRD_CURRENT_DATE='2026-09-08';
Object.assign(PRD_FIELD_GROUPS,{
 surveyList:[
  ['问卷名称与类型','只读；名称空值显示“—”；类型按当前组织有效类型解析。','CONFIG[state.portal].surveys / surveyTypeLabel()'],
  ['发送人数','内部定向问卷展示应提交内部人数；纯外部或二维码问卷展示“—”。','sentCount(s)'],
  ['提交人数','展示内部有效提交与外部有效提交之和；旧数据以 done 兼容。','submittedCount(s) / internalDone / externalDone'],
  ['状态与填写状态','问卷状态包含草稿、未开始、进行中、已暂停、已结束；我收到的填写状态仅展示未填写、已填写。未提交成功及旧版 in_progress 数据统一按未填写处理。','fillStatusKey(s)'],
  ['创建信息','创建人只读；创建时间精确到秒。','s.owner / s.createdAt'],
  ['我发布的操作','草稿：编辑、删除；未开始：查看、编辑、统计、适用时二维码、结束；进行中：统计、适用时二维码、暂停、结束；已暂停：统计、适用时二维码、恢复、结束、删除；已结束：统计及适用时二维码。','publishedActions(s)'],
  ['我收到的操作','未提交且满足频次与问卷状态时展示“提交问卷”；已有答卷时展示“查看”，已提交答卷不提供修改操作。','receivedActions(s) / canCreateResponse(s)']
 ],
 response:[
  ['题目结构','按问卷实际题目统一渲染填空、单选、多选、日期、文件/图片、签名和位置。','surveyQuestions(s) / surveyAnswerFields()'],
  ['必答校验','提交前逐题校验；必答题无有效值时阻止提交并提示题号。','responseAnswerError()'],
  ['题型专属设置','图片限制映射 accept=image/*；日期根据 includeTime 使用日期或日期时间；位置必须完成省、市、区县三级联动选择，detailedAddress 控制详细地址。','imageOnly / includeTime / detailedAddress'],
  ['答案采集','多选以数组语义采集并转为可读文本；文件记录文件名；位置按“省-市-区县｜详细地址”兼容保存。','collectSurveyAnswers(s)'],
  ['提交频次','仅提交一次最多新增一份；每日收集每个业务日最多新增一份。','canCreateResponse(s)'],
  ['提交后只读','答卷提交成功后仅支持查看；PC、移动端及直接编辑地址均不得进入修改状态。','responseDetailPage() / mobileFormPage()'],
  ['提交历史','仅展示有效答卷，按提交时间倒序；保留答卷编号和提交时间。','responseRecords(s)']
 ],
 surveyDetail:[
  ['问卷标题/类型/状态','只读；已删除、不属于当前组织或动态 ID 非法时展示不可用空态。','s.title / surveyTypeLabel(s) / s.status'],
  ['创建与收集信息','展示创建人、创建时间、接收人员、填写周期和按发布快照汇总的数据范围。','s.owner / s.createdAt / s.target / surveyDataScope(s)'],
  ['已提交','仅统计内部接收人员的有效提交人数，不包含外部人员提交。','statsSnapshot(s).internalDone'],
  ['未提交','max(0，应提交内部人数 - 内部有效提交数)；不计外部人员；无内部应提交人数时为“—”。','statsSnapshot(s).pending'],
  ['外部提交数','统计外部人员通过微信扫描二维码提交的有效问卷份数。','statsSnapshot(s).externalDone'],
  ['完成率','已提交 ÷（已提交 + 未提交），四舍五入；不计算外部提交数，无内部应提交人数时为“—”。','statsSnapshot(s).rate'],
  ['题目列表','优先读取问卷保存的题目结构，并完整保留题型专属配置。','surveyQuestions(s) / cloneQuestions()'],
  ['答卷明细','已提交明细与下载仅展示可识别的内部人员；外部提交单独统计，不计入已提交和完成率，且不提供人员明细。','statsPeopleData(“submitted”, s) / allSurveyResponsePage()']
 ],
 createEditor:[
  ['编辑布局','PC 为左侧题库与中间题目编辑区两栏；删除右侧题目设置模块及“应用修改”。移动端直接展示完整题目卡片。','editorStep() / mobileCreatePage()'],
  ['题目数量','单份问卷 1～100 题；达到 100 题后禁止继续添加。','state.questions.length / canAddQuestion()'],
  ['题目标题','在原题目卡片内直接输入；必填，1～200 个字符，实时写入草稿状态。','state.questions[].title / data-q-title'],
  ['题目类型','新增题目时确定；加入问卷或模板后仅展示只读类型标签，不生成题型变更控件。','state.questions[].type'],
  ['选择题选项','单选、多选为 2～20 个非空选项；单项不超过 50 字，支持新增、修改、删除和拖动排序。','state.questions[].options / questionOptionsEditor()'],
  ['必答及专属设置','卡片内直接设置必答；文件/图片支持仅图片，日期支持时分，位置支持详情地址。','required / imageOnly / includeTime / detailedAddress'],
  ['题目操作','“…”菜单提供上移、下移、复制、删除；删除二次确认；拖拽柄支持调整题目顺序。','data-q-action / data-question-drag'],
  ['题库添加','PC 点击题库追加到末尾，拖入题目区可插入首位、题目之间或末尾；移动端通过添加问题弹层新增。','questionToolbox() / questionDropZone() / mobileQuestionSheet()'],
  ['统一校验','下一步、保存草稿、保存模板和发布前定位并高亮首个错误题目。','firstQuestionError() / showQuestionError()']
 ],
 recipients:[
  ['接收对象模块','教育局端依次为内部部门、工作组、学校；学校端依次为内部部门、家长、班级。','recipientOverviewTabs()'],
  ['模块计数','每个模块独立显示“已选择 N 人”；正式发布时跨模块按 personId 合并。','recipientCategoryCount() / selectedRecipientSnapshot()'],
  ['添加人员','PC 打开专用选择弹窗；移动端进入分类子页面；均使用临时副本，确认提交、取消回滚。','beginRecipientPicker() / commitRecipientPicker() / discardRecipientPicker()'],
  ['内部部门','部门仅用于分组，不提供勾选；仅可选择有效实名人员，列表只展示姓名。','departmentPickerMarkup()'],
  ['工作组','教育局端固定展示教育质量提升工作组、校园安全工作组、教育数字化工作组；成员列表支持搜索、逐人选择、全选本组及部分选择半选。','RECIPIENT_WORKGROUP_TREE_V2 / workgroupPickerMarkup() / workgroupMemberMarkup()'],
  ['学校','学校平铺，仅展示学校名称和教职工人数，直接勾选且不下钻。','schoolPickerMarkup()'],
  ['学校类型筛选','支持按小学、初中、九年一贯制过滤学校列表；学校类型只用于筛选，不在行内展示。','state.recipientPickerSchoolType / filteredBureauSchools()'],
  ['学校覆盖范围','选择学校后覆盖该校全部有效教职工，不包含学生和家长。','RECIPIENT_DATA.bureau.school[].staffCount'],
  ['历史兼容','旧草稿或未开始问卷中的学校角色级范围不得静默扩大，编辑时要求重新选择学校。','normalizeRecipientMap() / requiresReselection'],
  ['发布快照','人员按 personId 全局合并并保存 personId、姓名、sourceCategories、部门、职务和工作组来源；学校范围保存 schoolId、学校名称、staffCount、selectionMode: all_staff。','selectedRecipientSnapshot()']
 ],
 publish:[
  ['外部人员填写','开启后生成外部填写二维码；允许仅外部人员填写；内部范围与外部填写均为空时阻止发布。','state.externalRecipient / allowExternal'],
  ['收集方式','支持仅提交一次、每日收集一次；切换方式时统一规范化每日配置。','state.frequency / normalizedCollectionSettings()'],
  ['开始与截止日期','必填，格式 YYYY-MM-DD；截止日期不得早于开始日期；按 Asia/Shanghai 自然日判断状态。','state.startDate / state.endDate / temporalStatusForDates()'],
  ['非工作日不收集','仅每日收集时展示；切回非每日方式后隐藏并保存 false。','state.skipNonWorkday'],
  ['每日收集提醒','仅每日收集时展示；切回非每日方式后隐藏并保存 false。','state.dailyReminder'],
  ['提醒时间','仅每日收集且提醒开启时展示并必填；关闭提醒后隐藏，首次开启默认 09:15。','state.reminderTime / DAILY_COLLECTION_DEFAULT_TIME'],
  ['状态计算','发布后自动计算未开始、进行中、已结束；暂停和手动结束优先于自动状态。','syncSurveyTemporalStatus(s)']
 ],
 stats:[
  ['统计任务','普通问卷展示累计统计；每日问卷使用按日快照，并在标题右侧展示统计日期。','statsSnapshot(s) / statsDateControl(s)'],
  ['默认日期','每日问卷默认昨天；无昨日任务时回退到最近一个不晚于昨日的已生成任务日。','selectedStatsDate(s) / availableStatsDates(s)'],
  ['已提交','仅统计内部接收人员的有效提交人数，不包含外部人员提交。','statsSnapshot(s).internalDone'],
  ['未提交','仅统计内部接收人员中尚未提交的人数，不包含外部人员；纯外部问卷显示“—”。','statsSnapshot(s).pending'],
  ['外部提交数','统计外部人员通过微信扫描二维码提交的有效问卷份数；不可点击且不提供人员明细。','statsSnapshot(s).externalDone'],
  ['完成率','已提交 ÷（已提交 + 未提交），四舍五入；不计算外部提交数，纯外部问卷显示“—”。','statsSnapshot(s).rate'],
  ['四卡片布局','存在统计任务时始终展示已提交、未提交、外部提交数、完成率；纯外部问卷依次显示 0、“—”、N、“—”；PC 四列，移动端 2×2。','statsSummaryCards()'],
  ['提示说明','已提交、未提交、外部提交数、完成率均展示可聚焦提示图标；PC 支持悬浮或键盘聚焦，移动端支持点击或聚焦，文案使用指定原文。','STATS_TIPS / infoTip()'],
  ['标题区域','“数据统计”和“题目数据”标题下方不展示解释性文字；每日问卷日期控件在移动端换行适配。','statsDetailPage()'],
  ['人员明细','已提交与未提交明细及下载仅包含内部人员；外部提交数不提供人员明细。','statsPeoplePage() / statsPeopleData()'],
  ['日期联动','切换日期联动四项指标、人员明细、下载和全部题目统计，并按问卷记忆当前日期。','state.statsDateBySurvey / data-stats-date'],
  ['无任务日期','没有可统计任务日时展示整块空态，禁用统计明细入口。','snapshot.hasData']
 ],
 statsPeople:[
  ['已提交明细','统计卡片和明细页仅统计内部人员有效提交；下载仅包含内部人员记录。','statsPeopleData(“submitted”)'],
  ['外部提交提示','存在外部提交时显示“外部提交已单独统计，不计入已提交和完成率，且不支持查看人员明细。当前共 N 份外部提交。”','external-detail-notice'],
  ['未提交明细','仅来自内部应提交范围；纯外部问卷不可进入明细。','statsPeopleData(“pending”)'],
  ['每日统计','人员列表和下载沿用统计详情当前选中日期。','statsSnapshot(s).date / state.statsDateBySurvey'],
  ['越权防护','外部答卷、已失效答卷、已删除问卷及其他组织数据不得通过详情路由访问。','allSurveyResponsePage()']
 ],
 mobileAnswer:[
  ['题目渲染','与 PC 共用七种题型结构和答案采集逻辑。','surveyAnswerFields(s) / collectSurveyAnswers(s)'],
  ['必答校验','提交前统一校验必答项，失败时阻止提交。','responseAnswerError()'],
  ['文件/图片','imageOnly=true 时限制选择图片，并在选择非图片后清空。','accept=image/* / file change handler'],
  ['日期与位置','includeTime 控制日期时间；移动端位置使用底部省市区分步面板，PC 使用页面内大尺寸省市区选择弹窗；detailedAddress 控制详细地址输入。','answerInput(q, index)'],
  ['填写权限','仅进行中且在接收范围内可填写；提交频次和修改权限与 PC 一致。','isReceivedSurveyVisible() / canCreateResponse()'],
  ['提交完成','成功后进入完成页，可查看本次提交；重复操作不得绕过频次限制。','mobileCompletePage()']
 ],
 mobileCreate:[
  ['基础信息','标题与问卷类型必填，填写描述选填。','state.draftTitle / state.draftSurveyTypeId / state.draftDescription'],
  ['题目编辑','完整题目卡片内直接编辑标题、选项、必答与题型专属配置；题目类型在新增时确定并只读展示。','questionCard()'],
  ['新增题目','底部“添加问题”打开题型选择层；选择后追加题目。','mobileQuestionSheet()'],
  ['题目排序','使用题目拖拽柄调整顺序，输入框、开关和菜单操作不得误触拖动。','data-question-drag'],
  ['下一步校验','标题、类型及全部题目校验通过后进入接收人员。','mobile-next-settings / firstQuestionError()']
 ]
});

PRD_PAGE_RULES['all-surveys-response']={title:'答卷详情',goal:'在组织权限范围内查看单份内部人员答卷的题目与答案。',fields:prdFields('surveyDetail','statsPeople')};
const PRD_PAGE_FIELD_GROUPS={
 list:['surveyFilters','surveyList','pagination'],'list-response':['surveyList','response'],'list-fill':['response'],
 'all-surveys':['allSurveyFilters','surveyList','pagination'],'all-surveys-detail':['surveyDetail'],'all-surveys-response':['surveyDetail','statsPeople'],
 'create-basic':['createBasic'],'create-editor':['createEditor'],'create-recipients':['recipients','recipientPicker'],'create-publish':['publish'],
 'templates-survey':['templates','pagination'],'template-basic':['templateBasic'],'template-editor':['createEditor'],
 'survey-types':['surveyTypes','pagination'],auth:['auth','pagination'],approval:['approval','pagination'],stats:['stats','pagination'],
 'stats-detail':['surveyDetail','stats','resourceCenter'],'stats-save-folder':['resourceCenter'],'stats-people':['statsPeople'],
 'mobile-fill-list':['surveyList'],'mobile-form':['mobileAnswer'],'mobile-complete':['mobileAnswer'],'mobile-templates':['templates','surveyTypes'],
 'mobile-create':['mobileCreate','createEditor'],'mobile-settings':['publish'],'mobile-recipients':['recipients','recipientPicker']
};
Object.entries(PRD_PAGE_FIELD_GROUPS).forEach(([key,groups])=>{if(PRD_PAGE_RULES[key])PRD_PAGE_RULES[key].fields=prdFields(...groups)});
PRD_PAGE_RULES['all-surveys-detail'].fields=PRD_FIELD_GROUPS.surveyDetail.filter(row=>!['已提交','未提交','外部提交数','完成率'].includes(row[0]));
PRD_PAGE_RULES['all-surveys-response'].fields=[
 ['问卷与答卷编号','只读；展示问卷名称和内部答卷编号。','s.title / person.responseId'],
 ['提交人信息','只读；展示姓名、所属组织、身份和手机号。','statsPeopleData(“submitted”, s, true)'],
 ['提交状态与时间','只读；仅展示有效内部答卷的状态和提交时间。','person.status / person.submittedAt'],
 ['题目与答案','按问卷题目顺序展示题目标题、题型和本次答案；空答案显示“—”。','statsQuestions(s) / person.answers'],
 ['访问边界','外部答卷、已失效答卷、已删除问卷及其他组织数据不得通过详情路由访问。','allSurveyResponsePage()']
];
PRD_OVERLAY_RULES['recipient-picker']={title:'接收人员选择',goal:'在当前分类中通过临时副本选择接收对象，确认后提交、取消后回滚。',fields:prdFields('recipientPicker','recipients')};

const prdV16CurrentPageKey=currentPrdPageKey;
currentPrdPageKey=function(){
 if(/^all-surveys\/[^/]+\/responses\/[^/]+$/.test(state.page))return'all-surveys-response';
 if(state.portal==='school'&&state.preview==='pc'&&state.page==='stats')return'all-surveys';
 return prdV16CurrentPageKey();
};
/* Recipient dynamic scopes V1.7: explicit scope intent, live membership resolution, transactional pickers. */
state.recipientManualPartialScopes=state.recipientManualPartialScopes instanceof Set?state.recipientManualPartialScopes:new Set();
state.recipientPickerManualPartialScopes=null;

function recipientManualScopeKey(category,scopeId){return `${category}:${scopeId}`}
function recipientScopeDefinitions(category){
 if(category==='department')return DEPARTMENT_PEOPLE[state.portal]||[];
 if(category==='workgroup')return recipientAllWorkgroupLeaves();
 return[]
}
function recipientManualScopeStore(store=state.recipients){return store===state.recipientPickerDraft?(state.recipientPickerManualPartialScopes||new Set()):state.recipientManualPartialScopes}
function recipientScopeObject(category,scopeId){const definition=recipientScopeDefinition(category,scopeId),members=recipientScopeMembers(category,scopeId);return{id:scopeId,scopeId,name:definition?.name||scopeId,category,level:'scope',scopeType:category,selectionMode:'dynamic',count:members.length}}

recipientDeepClone=function(item={}){return{...item,sourceCategories:[...(item.sourceCategories||[])],sourceScopeIds:[...(item.sourceScopeIds||[])],departmentSourceIds:[...(item.departmentSourceIds||[])],workgroupSourceIds:[...(item.workgroupSourceIds||[])],explicitCategories:[...(item.explicitCategories||[])],workgroupIds:[...(item.workgroupIds||[])],workgroupNames:[...(item.workgroupNames||[])],departments:(item.departments||[]).map(value=>({...value})),excludedChildIds:[...(item.excludedChildIds||[])]}};
const recipientScopeEchoBaseNormalizeRecipientMap=normalizeRecipientMap;
normalizeRecipientMap=function(input){
 const result=recipientScopeEchoBaseNormalizeRecipientMap(input);
 result.forEach((item,key)=>{
  if(!(item.level==='person'||item.personId))return;
  const category=recipientItemCategory(item),hasDepartmentSources=Object.prototype.hasOwnProperty.call(item,'departmentSourceIds'),hasWorkgroupSources=Object.prototype.hasOwnProperty.call(item,'workgroupSourceIds'),categorySources=category==='department'?(hasDepartmentSources?item.departmentSourceIds:item.departments?.map(value=>value.departmentId)||[]):category==='workgroup'?(hasWorkgroupSources?item.workgroupSourceIds:item.workgroupIds||[]):[],sources=[...(categorySources.length?categorySources:item.sourceScopeIds||[])];
  if(!sources.length&&category==='department'&&item.departmentId)sources.push(item.departmentId);
  if(!sources.length&&category==='workgroup'&&item.workgroupIds?.length)sources.push(...item.workgroupIds);
  item.sourceScopeIds=[...new Set(sources.filter(Boolean))];
  const categoryExplicit=Object.prototype.hasOwnProperty.call(item,'explicitCategories')?item.explicitCategories.includes(category):item.explicitSelection;
  item.explicitSelection=Boolean(categoryExplicit||!item.sourceScopeIds.length);
  result.set(key,item)
 });
 return result
};
recipientScopeIsInvalid=function(item){if(!isDynamicRecipientScope(item))return false;const category=item.scopeType||recipientItemCategory(item),scopeId=recipientScopeId(item);return!recipientScopeDefinition(category,scopeId)||recipientScopeMembers(category,scopeId).length===0};
recipientResolvedSelection=function(input,category=''){
 const items=input instanceof Map?[...input.values()]:Array.isArray(input)?input:[],people=new Map(),invalidScopes=[];let rangeTotal=0;
 items.forEach(item=>{const itemCategory=recipientItemCategory(item);if(category&&itemCategory!==category)return;if(item.requiresReselection&&!isDynamicRecipientScope(item)){invalidScopes.push(item);return}if(isDynamicRecipientScope(item)){const scopeType=item.scopeType||itemCategory,scopeId=recipientScopeId(item);if(recipientScopeIsInvalid(item)){invalidScopes.push(item);return}recipientScopeMembers(scopeType,scopeId).forEach(person=>people.set(person.personId||person.id,person));return}if(item.level==='person'||item.personId){const personId=item.personId||item.id;if(!personId)return;if(['department','workgroup'].includes(itemCategory)){const current=recipientDirectoryPerson(personId);if(!current)return;people.set(personId,{...item,...current,id:personId,personId});return}people.set(personId,item);return}rangeTotal+=Number(item.staffCount??item.count??0)});
 return{people,personIds:new Set(people.keys()),rangeTotal,total:people.size+rangeTotal,invalidScopes}
};

function recipientPersonItem(category,personId,store=state.recipientPickerDraft||state.recipients){return store?.get(recipientSelectionKey(category,personId))||null}
function recipientPersonSourceIds(item){return[...new Set((item?.sourceScopeIds||[]).filter(Boolean))]}
function recipientPersonSelectedInScope(category,personId,scopeId,store=state.recipientPickerDraft||state.recipients){
 if(store?.has(recipientScopeSelectionKey(category,scopeId)))return true;
 const item=recipientPersonItem(category,personId,store);if(!item)return false;
 const sources=recipientPersonSourceIds(item);if(sources.length)return sources.includes(scopeId);
 if(category==='department')return item.departmentId===scopeId;
 if(category==='workgroup')return(item.workgroupIds||[]).includes(scopeId);
 return Boolean(item.explicitSelection)
}
function recipientPersonCoveredByOtherScopes(category,personId,currentScopeId,store=state.recipientPickerDraft||state.recipients){
 const coveredByDynamic=[...store.values()].some(item=>isDynamicRecipientScope(item)&&recipientItemCategory(item)===category&&recipientScopeId(item)!==currentScopeId&&!recipientScopeIsInvalid(item)&&recipientScopeMembers(category,recipientScopeId(item)).some(person=>(person.personId||person.id)===personId));
 const item=recipientPersonItem(category,personId,store),coveredByExplicit=recipientPersonSourceIds(item).some(scopeId=>scopeId!==currentScopeId);
 return coveredByDynamic||coveredByExplicit||Boolean(item?.explicitSelection&&!recipientPersonSelectedInScope(category,personId,currentScopeId,store))
}
function recipientPersonPickerState(category,personId,scopeId,store=state.recipientPickerDraft||state.recipients){const checked=recipientPersonSelectedInScope(category,personId,scopeId,store);return{checked,coveredByOther:!checked&&recipientPersonCoveredByOtherScopes(category,personId,scopeId,store)}}
recipientScopeState=function(category,scopeId,store=state.recipientPickerDraft||state.recipients){const members=recipientScopeMembers(category,scopeId),dynamic=Boolean(store?.has(recipientScopeSelectionKey(category,scopeId))),selected=dynamic?members.length:members.filter(person=>recipientPersonSelectedInScope(category,person.personId||person.id,scopeId,store)).length,checked=dynamic||Boolean(members.length&&selected===members.length);return{checked,indeterminate:!checked&&selected>0&&selected<members.length,selected,members}};

recipientPersonValue=function(category,person,scopeId=''){const workgroup=category==='workgroup'?recipientWorkgroupById(scopeId||state.recipientWorkgroupId):null;return{id:person.personId,personId:person.personId,name:person.name,count:1,category,departmentId:person.departmentId||'',departmentName:person.departmentName||'',position:person.position||'',status:'active',level:'person',sourceScopeIds:scopeId?[scopeId]:[],explicitSelection:!scopeId,workgroupIds:workgroup?[workgroup.id]:[],workgroupNames:workgroup?[workgroup.name]:[]}};
function mergeDraftPersonSource(category,person,scopeId=''){
 const key=recipientSelectionKey(category,person.personId),existing=state.recipientPickerDraft.get(key),next=existing?recipientDeepClone(existing):recipientPersonValue(category,person,scopeId),sources=new Set(recipientPersonSourceIds(next));
 if(scopeId)sources.add(scopeId);else next.explicitSelection=true;
 next.sourceScopeIds=[...sources];
 if(category==='workgroup'&&scopeId){const group=recipientWorkgroupById(scopeId),ids=new Set(next.workgroupIds||[]);ids.add(scopeId);next.workgroupIds=[...ids];next.workgroupNames=next.workgroupIds.map(id=>id===scopeId?(group?.name||id):(next.workgroupNames?.[(existing?.workgroupIds||[]).indexOf(id)]||recipientWorkgroupById(id)?.name||id))}
 state.recipientPickerDraft.set(key,next)
}
function removeDraftPersonSource(category,personId,scopeId){
 const key=recipientSelectionKey(category,personId),item=state.recipientPickerDraft.get(key);if(!item)return;
 item.sourceScopeIds=recipientPersonSourceIds(item).filter(id=>id!==scopeId);
 if(category==='workgroup'&&scopeId){const index=(item.workgroupIds||[]).indexOf(scopeId);if(index>=0){item.workgroupIds.splice(index,1);item.workgroupNames?.splice(index,1)}}
 if(!item.sourceScopeIds.length&&!item.explicitSelection)state.recipientPickerDraft.delete(key);else state.recipientPickerDraft.set(key,item)
}
function normalizeCompleteRecipientScopes(){/* 明确人员始终保持明确选择；只有用户勾选范围复选框时才创建动态范围。 */}
setDraftDynamicScope=function(category,scopeId,checked){
 const members=recipientScopeMembers(category,scopeId),key=recipientScopeSelectionKey(category,scopeId),manualKey=recipientManualScopeKey(category,scopeId);if(!state.recipientPickerDraft||!recipientScopeDefinition(category,scopeId)||!members.length)return;
 if(checked){state.recipientPickerManualPartialScopes?.delete(manualKey);state.recipientPickerDraft.set(key,recipientScopeObject(category,scopeId));members.forEach(person=>removeDraftPersonSource(category,person.personId||person.id,scopeId))}else{state.recipientPickerDraft.delete(key);state.recipientPickerManualPartialScopes?.delete(manualKey);members.forEach(person=>removeDraftPersonSource(category,person.personId||person.id,scopeId))}
 recipientTrack(checked?'recipient_scope_select':'recipient_scope_unselect',{category,scope_type:category,scope_id:scopeId,selection_mode:checked?'dynamic':'none',resolved_person_count:members.length,module_selected_count:recipientCategoryCount(category,state.recipientPickerDraft)})
};
convertDraftScopeToPeople=function(category,scopeId,excludedPersonId){
 const members=recipientScopeMembers(category,scopeId),key=recipientScopeSelectionKey(category,scopeId),manualKey=recipientManualScopeKey(category,scopeId);state.recipientPickerDraft.delete(key);state.recipientPickerManualPartialScopes?.add(manualKey);
 members.forEach(person=>{const personId=person.personId||person.id;if(personId===excludedPersonId)removeDraftPersonSource(category,personId,scopeId);else mergeDraftPersonSource(category,person,scopeId)});
 recipientTrack('recipient_scope_convert_to_people',{category,scope_type:category,scope_id:scopeId,person_id:excludedPersonId,selection_mode:'explicit_people',resolved_person_count:members.length,converted_person_count:Math.max(0,members.length-1),module_selected_count:recipientCategoryCount(category,state.recipientPickerDraft)})
};
removeDraftPersonEverywhere=function(category,personId){
 const scopes=[...state.recipientPickerDraft.values()].filter(item=>isDynamicRecipientScope(item)&&recipientItemCategory(item)===category&&recipientScopeMembers(category,recipientScopeId(item)).some(person=>(person.personId||person.id)===personId));scopes.forEach(scope=>convertDraftScopeToPeople(category,recipientScopeId(scope),personId));state.recipientPickerDraft.delete(recipientSelectionKey(category,personId))
};
setDraftPerson=function(category,person,checked,scopeId=''){
 const manualKey=scopeId?recipientManualScopeKey(category,scopeId):'';
 if(checked){mergeDraftPersonSource(category,person,scopeId);if(manualKey)state.recipientPickerManualPartialScopes?.add(manualKey)}else if(scopeId&&recipientDraftScopeHas(category,scopeId))convertDraftScopeToPeople(category,scopeId,person.personId);else{removeDraftPersonSource(category,person.personId,scopeId);if(manualKey)state.recipientPickerManualPartialScopes?.add(manualKey)}
 recipientTrack(checked?'recipient_person_select':'recipient_person_unselect',{category,person_id:person.personId,department_id:category==='department'?scopeId:'',workgroup_id:category==='workgroup'?scopeId:'',selection_mode:'explicit_people',module_selected_count:recipientCategoryCount(category,state.recipientPickerDraft)})
};

recipientDisplayItemsForCategory=function(category,store=state.recipients){
 const items=recipientItemsForCategory(category,store),scopes=items.filter(item=>isDynamicRecipientScope(item)&&!recipientScopeIsInvalid(item)),manualScopes=recipientManualScopeStore(store);
 return items.filter(item=>{if(!(item.level==='person'||item.personId))return true;const manualSource=recipientPersonSourceIds(item).some(scopeId=>manualScopes.has(recipientManualScopeKey(category,scopeId)));if(manualSource)return true;return!scopes.some(scope=>recipientScopeMembers(scope.scopeType||category,recipientScopeId(scope)).some(person=>(person.personId||person.id)===(item.personId||item.id)))})
};
recipientModuleMarkupV2=function([category,label]){
 const items=recipientDisplayItemsForCategory(category),count=recipientCategoryCount(category),tags=items.map(item=>{const invalid=item.requiresReselection||recipientScopeIsInvalid(item),scope=isDynamicRecipientScope(item),scopeCount=scope&&!invalid?recipientScopeMembers(item.scopeType||category,recipientScopeId(item)).length:0,labelText=invalid?`${item.name}（范围已失效，请重新选择）`:item.name;return `<span class="${invalid?'needs-reselection':''} ${scope?'scope-recipient':''}"><span class="recipient-scope-name">${esc(labelText)}</span>${scope&&!invalid?`<small class="recipient-scope-count">当前 ${scopeCount} 人</small>`:''}<button type="button" data-remove-recipient="${esc(item._selectionKey)}" aria-label="移除${esc(item.name)}">×</button></span>`}).join('');
 return `<article class="recipient-overview-module" data-recipient-module="${category}"><header><div><h3>${esc(label)}</h3></div><div class="recipient-module-actions"><strong class="recipient-module-count" data-module-count="${category}">已选择 ${count} 人</strong><button type="button" data-open-recipient-category="${category}">添加人员</button></div></header><div class="recipient-module-selection">${tags?`<div class="recipient-module-tags">${tags}</div>`:'<span class="recipient-module-empty">暂未选择</span>'}</div></article>`
};
function recipientOtherScopeBadge(stateValue){return stateValue.coveredByOther?'<em class="recipient-other-scope">已由其他范围选中</em>':''}
departmentPickerMarkup=function(mobile=false){
 const groups=departmentFilteredGroups(),keyword=state.recipientPickerSearch.trim(),people=departmentFilteredPeople(),allSelected=Boolean(people.length)&&people.every(person=>recipientPersonSelectedInScope('department',person.personId,person.departmentId,state.recipientPickerDraft));
 const rows=groups.map(group=>{const open=keyword?true:recipientExpanded(group.id,group.isLeaf?!mobile:true),scopeState=recipientScopeState('department',group.id,state.recipientPickerDraft),members=group.allPeople,selectable=group.isLeaf&&members.length>0,hasDepartmentChildren=(DEPARTMENT_PEOPLE[state.portal]||[]).some(child=>child.parentId===group.id),children=group.people.length?group.people.map(person=>{const personState=recipientPersonPickerState('department',person.personId,group.id,state.recipientPickerDraft);return `<label class="${mobile?'mobile-recipient-child':'recipient-row'} department-person-row" data-picker-person-row="${person.personId}"><input type="checkbox" data-picker-person="${person.personId}" data-picker-person-scope="${group.id}" ${personState.checked?'checked':''}><span>${esc(person.name)}</span>${recipientOtherScopeBadge(personState)}</label>`}).join(''):'<div class="recipient-department-empty">该部门暂无可选人员</div>',selector=group.isLeaf?`<label class="recipient-department-scope ${selectable?'':'is-disabled'}"><input type="checkbox" data-picker-dynamic-scope="department" data-picker-scope-id="${group.id}" ${scopeState.checked?'checked':''} ${selectable?'':'disabled'}><span><b>${esc(group.name)}</b><small>${members.length?`${members.length} 名可选人员`:'暂无可选人员'}</small></span></label>`:`<div class="recipient-department-label"><b>${esc(group.name)}</b><small>下级部门</small></div>`,toggle=hasDepartmentChildren||group.isLeaf?`<button type="button" class="${mobile?'':'recipient-expander'}" data-picker-toggle-department="${group.id}" aria-label="${open?'收起':'展开'}${esc(group.name)}">${mobile?`${open?'收起':'下级'}　›`:(open?'⌄':'›')}</button>`:'';return `<article class="${mobile?'mobile-recipient-group':'recipient-group department-group'} ${open?'open expanded':''} ${group.isLeaf?'is-leaf':'is-branch'}" style="--department-depth:${group.depth}" data-picker-department="${group.id}"><div class="${mobile?'mobile-recipient-row':'recipient-parent-row'} department-group-row">${toggle}${selector}</div>${group.isLeaf?`<div class="${mobile?'mobile-recipient-children ':''}recipient-children ${open?'show':''}">${children}</div>`:''}</article>`}).join('');
 return `<div class="recipient-picker-filters"><div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-search" type="text" maxlength="50" value="${esc(state.recipientPickerSearch)}" placeholder="${mobile?'请输入姓名或部门':'搜索姓名或部门'}"></div></div>${mobile?`<label class="mobile-recipient-select-all"><input type="checkbox" data-picker-department-all ${allSelected?'checked':''} ${people.length?'':'disabled'}><span>全选当前结果</span></label>`:'<div class="recipient-table-head person-head name-only"><span>部门及人员</span></div>'}<div class="${mobile?'mobile-recipient-list':'recipient-tree pc-recipient-tree'}">${rows||'<div class="recipient-filter-empty"><b>未找到符合条件的人员</b><span>请调整姓名或部门关键词</span></div>'}</div>`
};
workgroupTreeMarkup=function(mobile=false){
 const keyword=state.recipientPickerGroupSearch.trim(),renderLeaf=(leaf,depth=0,force=false)=>{if(keyword&&!force&&!leaf.name.includes(keyword))return'';const active=leaf.id===state.recipientWorkgroupId,members=recipientWorkgroupMembers(leaf.id),scopeState=recipientScopeState('workgroup',leaf.id,state.recipientPickerDraft),rowClass=mobile?'mobile-workgroup-leaf-row':'recipient-workgroup-leaf-row';return `<div class="${rowClass} ${active?'active':''}" style="--tree-depth:${depth}"><label class="recipient-workgroup-scope ${members.length?'':'is-disabled'}" title="选择整个${esc(leaf.name)}"><input type="checkbox" data-picker-dynamic-scope="workgroup" data-picker-scope-id="${leaf.id}" ${scopeState.checked?'checked':''} ${members.length?'':'disabled'}><span class="sr-only">选择整个${esc(leaf.name)}</span></label><button type="button" class="${mobile?'mobile-workgroup-node':'recipient-workgroup-node'}" data-workgroup-node="${leaf.id}"><span>${esc(leaf.name)}</span><em>${members.length} 人　›</em></button></div>`};
 const nodes=RECIPIENT_WORKGROUP_TREE_V2.map(node=>{if(node.children?.length){const parentMatch=node.name.includes(keyword),children=node.children.map(child=>renderLeaf(child,1,parentMatch)).join('');if(keyword&&!parentMatch&&!children)return'';const open=keyword?true:recipientExpanded(node.id,true);return `<section class="recipient-workgroup-branch ${open?'open':''}"><button type="button" class="recipient-workgroup-parent" data-workgroup-parent-toggle="${node.id}"><span>${open?'⌄':'›'}　${esc(node.name)}</span></button><div class="recipient-workgroup-children ${open?'show':''}">${children}</div></section>`}return renderLeaf(node,0)}).join('');
 return nodes||'<div class="recipient-filter-empty"><b>未找到符合条件的工作组</b><span>请调整工作组名称</span></div>'
};
workgroupMemberMarkup=function(mobile=false){
 const group=recipientWorkgroupLeaf(state.recipientWorkgroupId),allMembers=recipientWorkgroupMembers(group?.id),keyword=state.recipientPickerPersonSearch.trim(),visibleMembers=allMembers.filter(person=>!keyword||person.name.includes(keyword)),scopeState=recipientScopeState('workgroup',group?.id||'',state.recipientPickerDraft);
 const rows=visibleMembers.map(person=>{const personState=recipientPersonPickerState('workgroup',person.personId,group?.id||'',state.recipientPickerDraft);return `<label class="${mobile?'mobile-recipient-child':'recipient-workgroup-person'}" data-workgroup-person-row="${person.personId}"><input type="checkbox" data-picker-workgroup-person="${person.personId}" data-picker-person-scope="${group?.id||''}" ${personState.checked?'checked':''}><span>${esc(person.name)}</span>${recipientOtherScopeBadge(personState)}</label>`}).join('');
 return `<div class="recipient-workgroup-panel-head"><div><h4>${esc(group?.name||'工作组')}</h4><span>${allMembers.length} 名可选人员</span></div></div><div class="recipient-picker-filters"><div class="recipient-search-box"><span>⌕</span><input id="recipient-picker-person-search" type="text" maxlength="50" value="${esc(state.recipientPickerPersonSearch)}" placeholder="搜索人员姓名"></div></div><label class="${mobile?'mobile-recipient-select-all':'recipient-workgroup-select-all'}"><input type="checkbox" data-workgroup-select-all ${scopeState.checked?'checked':''} ${allMembers.length?'':'disabled'}><span>全选本组</span></label><div class="${mobile?'mobile-recipient-list':'recipient-workgroup-person-list'}">${rows||(allMembers.length?'<div class="recipient-filter-empty"><b>未找到符合条件的人员</b><span>请调整人员姓名</span></div>':'<div class="recipient-filter-empty"><b>该工作组暂无可选人员</b><span>请选择其他工作组</span></div>')}</div>`
};

const recipientScopeEchoBaseBindRecipientPickerControls=bindRecipientPickerControls;
bindRecipientPickerControls=function(root=$('#view')){
 recipientScopeEchoBaseBindRecipientPickerControls(root);
 const departmentAll=$('[data-picker-department-all]',root);if(departmentAll){const people=departmentFilteredPeople(),selected=people.filter(person=>recipientPersonSelectedInScope('department',person.personId,person.departmentId,state.recipientPickerDraft)).length;departmentAll.checked=Boolean(people.length)&&selected===people.length;departmentAll.indeterminate=selected>0&&selected<people.length;departmentAll.onchange=()=>{people.forEach(person=>setDraftPerson('department',person,departmentAll.checked,person.departmentId));recipientTrack(departmentAll.checked?'recipient_person_select_all':'recipient_person_unselect_all',{category:'department',search_keyword:state.recipientPickerSearch,module_selected_count:recipientCategoryCount('department',state.recipientPickerDraft)});rerenderRecipientPicker()}};
 const workgroupAll=$('[data-workgroup-select-all]',root);if(workgroupAll){const scopeId=state.recipientWorkgroupId,scopeState=recipientScopeState('workgroup',scopeId,state.recipientPickerDraft);workgroupAll.checked=scopeState.checked;workgroupAll.indeterminate=scopeState.indeterminate;workgroupAll.setAttribute('aria-checked',scopeState.indeterminate?'mixed':String(scopeState.checked));workgroupAll.onchange=()=>{recipientScopeMembers('workgroup',scopeId).forEach(person=>setDraftPerson('workgroup',person,workgroupAll.checked,scopeId));recipientTrack(workgroupAll.checked?'recipient_person_select_all':'recipient_person_unselect_all',{category:'workgroup',workgroup_id:scopeId,module_selected_count:recipientCategoryCount('workgroup',state.recipientPickerDraft)});rerenderRecipientPicker()}}
};

const recipientScopeEchoBaseClearRecipientPickerState=clearRecipientPickerState;
clearRecipientPickerState=function(){recipientScopeEchoBaseClearRecipientPickerState();state.recipientPickerManualPartialScopes=null};
const recipientScopeEchoBaseBeginRecipientPicker=beginRecipientPicker;
beginRecipientPicker=function(category,mode){recipientScopeEchoBaseBeginRecipientPicker(category,mode);state.recipientPickerManualPartialScopes=new Set([...state.recipientManualPartialScopes].filter(key=>key.startsWith(`${category}:`)))};
commitRecipientPicker=function(){
 const category=state.recipientPickerCategory,mode=state.recipientPickerMode,draft=state.recipientPickerDraft;if(!draft)return;
 [...state.recipients.entries()].forEach(([key,item])=>{if(recipientItemCategory(item)===category)state.recipients.delete(key)});draft.forEach((item,key)=>state.recipients.set(key,recipientDeepClone(item)));
 [...state.recipientManualPartialScopes].filter(key=>key.startsWith(`${category}:`)).forEach(key=>state.recipientManualPartialScopes.delete(key));(state.recipientPickerManualPartialScopes||new Set()).forEach(key=>state.recipientManualPartialScopes.add(key));
 const count=recipientCategoryCount(category);recipientTrack('recipient_picker_confirm',{category,source:mode,module_selected_count:count});clearRecipientPickerState();if(mode==='mobile'){state.page='mobile/recipients';location.replace('#mobile/recipients')}else renderShell()
};
const recipientScopeEchoBaseResetCreationState=resetCreationState;
resetCreationState=function(){recipientScopeEchoBaseResetCreationState();state.recipientManualPartialScopes=new Set();state.recipientPickerManualPartialScopes=null};

function rawRecipientSelectionEntries(){return[...state.recipients.entries()].map(([key,item])=>[key,recipientDeepClone(item)])}
draftRecipientSnapshot=function(s){if(Array.isArray(s?.recipientSelections)&&s.recipientSelections.length)return s.recipientSelections.map(entry=>Array.isArray(entry)?entry[1]:entry);if(s?.recipientSnapshot?.length)return s.recipientSnapshot;if(s?.recipientRules?.length||s?.explicitPersonIds?.length)return surveyRecipientItems(s);return s?.total?[{id:`draft-target-${s.id}`,name:s.target||'已选接收范围',count:s.total,category:'legacy',level:'group'}]:[]};
draftPayload=function(existing=null){const external=state.externalRecipient,total=recipientCount(),collection=normalizedCollectionSettings(state),selectedType=surveyTypeById(state.draftSurveyTypeId);return{title:state.draftTitle||existing?.title||'未命名问卷',description:state.draftDescription,surveyTypeId:selectedType?.id||'',surveyTypeName:selectedType?.name||'',channel:external?'public':'internal',allowExternal:external,target:recipientSummary()||existing?.target||'未选择',time:'未发布',startDate:state.startDate,endDate:state.endDate,internalDone:0,externalDone:0,done:0,total,recipientSelections:rawRecipientSelectionEntries(),recipientManualPartialScopes:[...state.recipientManualPartialScopes],recipientSelectionSchemaVersion:2,recipientSnapshot:[],received:false,frequency:collection.frequency,allowModify:false,skipNonWorkday:collection.skipNonWorkday,dailyReminder:collection.dailyReminder,reminderTime:collection.reminderTime,questions:cloneQuestions(state.questions)}};
const recipientScopeEchoBaseLoadEditableSurveyState=loadEditableSurveyState;
loadEditableSurveyState=function(s){recipientScopeEchoBaseLoadEditableSurveyState(s);state.recipientManualPartialScopes=new Set(s?.recipientManualPartialScopes||[]);if(Array.isArray(s?.recipientSelections)&&s.recipientSelections.length){state.recipients=normalizeRecipientMap(new Map(s.recipientSelections.map((entry,index)=>Array.isArray(entry)?[entry[0],recipientDeepClone(entry[1])]:[entry?._selectionKey||`${recipientItemCategory(entry||{})}:${entry?.personId||entry?.scopeId||entry?.id||index}`,recipientDeepClone(entry)])))}else state.recipients=normalizeRecipientMap(state.recipients)};
const recipientScopeEchoBaseLoadSurveyTemplateState=loadSurveyTemplateState;
loadSurveyTemplateState=function(item,editing=false){recipientScopeEchoBaseLoadSurveyTemplateState(item,editing);state.recipientManualPartialScopes=new Set();state.recipients=new Map()};
const recipientScopeEchoBaseSurveyTemplateValue=surveyTemplateValue;
surveyTemplateValue=function(existing){return surveyTemplateContentValue(existing)};

selectedRecipientSnapshot=function(){
 const people=new Map(),ranges=[],snapshotAt=responseTimestamp();
 function ensurePerson(person,category){const personId=person.personId||person.id,record=people.get(personId)||{personId,name:person.name,count:1,level:'person',status:person.status||'active',sourceCategories:new Set(),departmentSourceIds:new Set(),workgroupSourceIds:new Set(),explicitCategories:new Set(),departments:new Map(),positions:new Set(),workgroups:new Map()};record.sourceCategories.add(category);recipientPersonAffiliations(personId).forEach(affiliation=>{record.departments.set(affiliation.departmentId,{...affiliation});if(affiliation.position)record.positions.add(affiliation.position)});people.set(personId,record);return record}
 function addDepartmentSource(record,personId,departmentId){if(!departmentId)return;record.departmentSourceIds.add(departmentId);const affiliation=recipientPersonAffiliations(personId).find(value=>value.departmentId===departmentId)||{departmentId,departmentName:recipientScopeDefinition('department',departmentId)?.name||'',position:''};record.departments.set(departmentId,{...affiliation});if(affiliation.position)record.positions.add(affiliation.position)}
 function addWorkgroupSource(record,workgroupId){if(!workgroupId)return;record.workgroupSourceIds.add(workgroupId);record.workgroups.set(workgroupId,{workgroupId,workgroupName:recipientScopeDefinition('workgroup',workgroupId)?.name||workgroupId})}
 usableRecipientItems().forEach(item=>{
  const category=recipientItemCategory(item);
  if(isDynamicRecipientScope(item)){const scopeId=recipientScopeId(item);recipientScopeMembers(category,scopeId).forEach(person=>{const personId=person.personId||person.id,record=ensurePerson(person,category);if(category==='department')addDepartmentSource(record,personId,scopeId);if(category==='workgroup')addWorkgroupSource(record,scopeId)});return}
  if(item.level==='person'||item.personId){const personId=item.personId||item.id,current=['department','workgroup'].includes(category)?recipientDirectoryPerson(personId):null;if(['department','workgroup'].includes(category)&&!current)return;const source=current?{...item,...current}:item,record=ensurePerson(source,category),sources=recipientPersonSourceIds(item),explicit=Object.prototype.hasOwnProperty.call(item,'explicitCategories')?item.explicitCategories.includes(category):Boolean(item.explicitSelection);if(explicit)record.explicitCategories.add(category);if(category==='department'){const departmentSources=sources.length?sources:(!explicit&&item.departmentId?[item.departmentId]:[]);departmentSources.forEach(scopeId=>addDepartmentSource(record,personId,scopeId))}if(category==='workgroup'){const workgroupSources=sources.length?sources:(!explicit?(item.workgroupIds||[]):[]);workgroupSources.forEach(scopeId=>addWorkgroupSource(record,scopeId));(item.workgroupIds||[]).forEach((workgroupId,index)=>record.workgroups.set(workgroupId,{workgroupId,workgroupName:item.workgroupNames?.[index]||recipientScopeDefinition('workgroup',workgroupId)?.name||workgroupId}))}return}
  if(item.level==='school'||item.schoolId){ranges.push({id:item.schoolId||item.id,schoolId:item.schoolId||item.id,name:item.name,type:item.type||'',count:Number(item.staffCount??item.count??0),staffCount:Number(item.staffCount??item.count??0),category:'school',level:'school',selectionMode:'all_staff',frozen:true,snapshotAt});return}
  ranges.push({id:item.id,name:item.name,count:Number(item.count||0),category,level:item.level||'group',parent:item.parent||'',excludedChildIds:[...(item.excludedChildIds||[])],frozen:true,snapshotAt})
 });
 const personSnapshots=[...people.values()].map(record=>{const departments=[...record.departments.values()],workgroups=[...record.workgroups.values()],positions=[...record.positions],explicitCategories=[...record.explicitCategories];return{personId:record.personId,name:record.name,count:1,category:[...record.sourceCategories][0]||'department',level:'person',status:record.status,selectionMode:'snapshot',frozen:true,snapshotAt,sourceCategories:[...record.sourceCategories],departmentSourceIds:[...record.departmentSourceIds],workgroupSourceIds:[...record.workgroupSourceIds],explicitCategories,explicitSelection:explicitCategories.length>0,departmentId:departments[0]?.departmentId||'',departmentName:departments[0]?.departmentName||'',position:positions[0]||'',departments,positions,workgroupIds:workgroups.map(value=>value.workgroupId),workgroupNames:workgroups.map(value=>value.workgroupName)}});
 return[...personSnapshots,...ranges]
};

const recipientScopeEchoBaseBindRecipientOverviewV2=bindRecipientOverviewV2;
bindRecipientOverviewV2=function(){recipientScopeEchoBaseBindRecipientOverviewV2();$$('[data-remove-recipient]').forEach(button=>button.onclick=()=>{const key=button.dataset.removeRecipient,item=state.recipients.get(key),category=item?recipientItemCategory(item):key.split(':')[0];if(isDynamicRecipientScope(item))state.recipientManualPartialScopes.add(recipientManualScopeKey(category,recipientScopeId(item)));state.recipients.delete(key);recipientTrack('recipient_item_remove',{category,object_id:item?.personId||item?.schoolId||item?.id||key,selection_mode:isDynamicRecipientScope(item)?'dynamic':'explicit_people',module_selected_count:recipientCategoryCount(category)});renderShell()})};

recipientTabMeta=function(){return state.portal==='bureau'?{department:['内部部门','可选择整个部门，也可展开后选择具体人员'],workgroup:['工作组','可选择整个工作组，也可进入成员列表选择具体人员'],school:['学校','直接选择具体学校，默认覆盖该校全部有效教职工']}:{department:['内部部门','可选择整个部门，也可展开后选择具体人员'],parent:['家长','按年级或班级选择学生家长'],class:['班级','按年级选择全部或部分班级']}};
PRD_FIELD_GROUPS.recipients=[
 ['接收对象模块','教育局端依次为内部部门、工作组、学校；学校端依次为内部部门、家长、班级。','recipientOverviewTabs()'],
 ['完整范围回显','完整覆盖部门或工作组全部有效成员时，仅回显范围名称；范围标签不展示人员姓名或人数。','normalizeCompleteRecipientScopes() / recipientModuleMarkupV2()'],
 ['部分范围回显','未完整覆盖范围时逐人回显；从完整范围取消一人时，仅拆分当前范围为其余人员。','convertDraftScopeToPeople() / recipientDisplayItemsForCategory()'],
 ['手动拆分优先','手动拆分范围禁止因其他范围覆盖而自动合并；仅在当前范围成员被重新补齐后恢复范围名称。','state.recipientManualPartialScopes'],
 ['交叉范围','完整覆盖多个范围时展示全部范围名称；实际人数始终按 personId 全局去重。','recipientResolvedSelection()'],
 ['其他范围覆盖','人员未在当前范围选中但被其他范围覆盖时，标识“已由其他范围选中”。','recipientPersonCoveredByOtherScopes()'],
 ['成员有效性','完整范围只包含 status=active 且 canReceive=true 的人员；范围不存在或有效成员为零时阻止发布。','recipientScopeMembers() / recipientScopeIsInvalid()'],
 ['问卷编辑','草稿与未开始问卷保存范围对象、明确人员及手动拆分标识，再次编辑时保持原回显语义。','recipientSelections / recipientManualPartialScopes'],
 ['发布快照','发布确认时按最新组织成员解析范围，按 personId 合并去重后固化 recipientSnapshot；发布后组织变化不回写。','selectedRecipientSnapshot()']
];
PRD_FIELD_GROUPS.recipientPicker=[
 ['范围选择','部门及有有效成员的工作组提供完整范围复选框；空范围禁用。','data-picker-dynamic-scope'],
 ['人员选择','展开范围后逐人选择；人员复选状态表示当前范围来源，不把其他范围覆盖误判为当前选中。','recipientPersonPickerState()'],
 ['自动归一化','逐人选满当前有效成员后自动转为范围对象；非手动拆分状态下，其他被完整覆盖范围同步归一化。','normalizeCompleteRecipientScopes()'],
 ['确认与取消','PC 和移动端均使用临时副本；确认提交当前模块，取消、返回、遮罩或 Escape 回滚。','commitRecipientPicker() / discardRecipientPicker()'],
 ['搜索','搜索仅过滤展示，不改变完整范围成员口径；关键词最多 50 字。','state.recipientPickerSearch / state.recipientPickerGroupSearch'],
 ['来源删除','删除范围标签只删除该范围来源；删除人员标签只删除对应明确人员对象。','data-remove-recipient']
];
['create-recipients','mobile-recipients','mobile-settings'].forEach(key=>{if(PRD_PAGE_RULES[key])PRD_PAGE_RULES[key].fields=prdFields(...(PRD_PAGE_FIELD_GROUPS[key]||['recipients','recipientPicker']))});
PRD_OVERLAY_RULES['recipient-picker']={title:'接收人员选择',goal:'在 PC 与移动端按相同规则选择完整部门、完整工作组或具体人员，并保持来源、拆分和去重语义。',fields:prdFields('recipientPicker','recipients')};
renderRecipientPickerPrd=function(rule,key,entryType){
 const features=[
  ['范围回显','完整部门','点击整部门或逐人选满全部有效成员后，汇总区仅显示部门名称。','P0','status=active 且 canReceive=true'],
  ['范围回显','完整工作组','点击整工作组或逐人选满全部有效成员后，汇总区仅显示工作组名称。','P0','纯目录与空组不可选'],
  ['人员回显','部分选择','仅选择部分成员时逐人显示姓名；模块人数按 personId 去重。','P0','PC 与移动端一致'],
  ['选择联动','手动拆分','完整范围取消一人后仅拆当前范围；其他完整范围保持不变。','P0','拆分状态持久化'],
  ['选择联动','重新补齐','当前范围全部成员重新补齐后清除拆分状态并恢复范围名称。','P0','手动拆分优先'],
  ['交叉范围','来源与去重','完整覆盖多个范围时展示所有范围名称；重叠人员只计一人。','P0','标签与人数口径分离'],
  ['交叉范围','覆盖提示','当前范围未选但人员被其他范围覆盖时显示“已由其他范围选中”。','P0','不得误改总人数'],
  ['数据保存','问卷编辑','草稿与未开始问卷保存 scope/person 对象及手动拆分键，编辑时恢复原选择语义。','P0','不得提前展开范围'],
  ['发布处理','解析并固化','发布确认时按最新有效成员解析范围、合并去重并固化人员快照。','P0','发布后不随组织变化'],
  ['异常校验','失效范围','范围被删除、越权或有效成员为零时标记失效并阻止发布。','P0','不得静默转空']
 ];
 const request=`{\n  "recipientSelections": [\n    { "level": "scope", "scopeType": "department", "scopeId": "school-admin", "scopeName": "行政办公室", "selectionMode": "dynamic" },\n    { "level": "person", "personId": "school-person-liu", "name": "刘晨", "category": "department", "sourceScopeIds": ["school-teaching"] }\n  ],\n  "manualPartialScopes": ["department:school-teaching"]\n}`;
 const snapshot=`{\n  "recipientSnapshot": [\n    { "level": "person", "personId": "school-person-chen", "name": "陈芳", "sourceCategories": ["department"] }\n  ],\n  "recipientCount": 1,\n  "snapshotAt": "2026-09-05 19:30:00"\n}`;
 return `<article class="prd-document"><header class="prd-document-head"><div><small>${entryType==='page'?'页面':'弹窗'}规则 · ${esc(key)}</small><h2>${esc(rule.title)}</h2></div><button type="button" class="prd-close" aria-label="关闭 PRD 规则">×</button></header><aside class="prd-prerequisite" role="note"><strong>实现结论</strong><p>编辑态保存范围语义，发布态固化人员快照。完整范围只回显组织名称，部分范围只回显明确人员。</p><small>PC 与移动端复用同一选择 Map、拆分标识、归一化、计数和发布解析规则。</small></aside><section><h3>1. 背景与目标</h3><p>${esc(rule.goal)}</p></section><section><h3>2. 用户与使用场景</h3><p>教育局和学校授权用户在创建问卷时，需要同时选择完整组织范围与具体人员，并能从汇总回显准确判断选择意图。</p></section><section><h3>3. 需求范围</h3><h4>In Scope</h4><p>部门、工作组、具体人员、自动归一化、手动拆分、交叉覆盖、草稿和未开始问卷恢复、发布解析与快照固化。</p><h4>Out of Scope</h4><p>学校、家长和班级原有范围规则，组织架构维护，以及已发布问卷接收快照回写。</p></section><section><h3>4. 功能需求列表</h3>${prdTable(['功能模块','功能点','需求描述','优先级（P0 / P1 / P2）','备注说明'],features)}</section><section><h3>5. 核心流程与交互说明</h3><p>选择器以当前范围来源展示复选状态。选满范围后写入 scope 对象；从 scope 中取消人员时生成该范围的手动拆分键及剩余人员来源。补齐当前范围后重新压缩为 scope。确认后提交临时副本，取消类操作不修改正式选择。</p>${prdTable(['字段/信息','限制与展示规则','当前原型来源'],rule.fields||[],'prd-field-table')}</section><section><h3>6. 异常场景与边界条件</h3><p>停用或无接收权限人员不参与完整范围判断。重叠范围的人员在当前范围取消后仍可由其他范围覆盖，并显示来源提示。范围缺失、越权或有效成员为零时必须返回可识别错误并阻止发布。</p></section><section><h3>7. 数据口径与埋点需求</h3><p>编辑态范围对象字段为 level、scopeType、scopeId、scopeName、selectionMode；人员对象字段为 level、personId、name、category、sourceScopeIds。人数按 personId 全局去重。记录 recipient_scope_select、recipient_scope_unselect、recipient_scope_convert_to_people、recipient_person_select、recipient_person_unselect、recipient_picker_confirm、recipient_picker_cancel、recipient_scope_invalid，公共属性包含 portal、device、category、scope_id、person_id、selection_mode、module_selected_count、selected_count 和 timestamp。</p><h4>问卷编辑请求示例</h4><pre>${esc(request)}</pre><h4>发布结果示例</h4><pre>${esc(snapshot)}</pre></section><section><h3>8. 风险、依赖与限制</h3><p>服务端依赖统一身份、组织权限、部门和工作组成员接口。发布事务必须在同一权限快照内解析全部范围并写入接收人员快照；缓存键至少包含 portalType、orgId、permissionScope 和 organizationVersion。</p></section><section><h3>9. 验收标准</h3><p>PC 与移动端均通过完整部门、完整工作组、部分人员、逐人选满、取消一人、重新补齐、交叉覆盖、来源删除、草稿与未开始问卷恢复、空范围、失效范围及发布前后组织变化测试；界面回显、人数和发布快照结果一致。</p></section></article>`
};

/* Dynamic recipient scope PRD V1.7: this final definition supersedes legacy selector rules above. */
PRD_FIELD_GROUPS.recipients=[
 ['接收对象模块','教育局端依次为内部部门、工作组、学校；学校端依次为内部部门、家长、班级。','recipientOverviewTabs()'],
 ['动态范围回显','主动勾选部门或工作组后回显范围名称及当前有效人数；不展开回显成员姓名。','recipientModuleMarkupV2()'],
 ['部分范围回显','未完整覆盖范围时逐人回显；从动态范围取消一人时，仅拆分当前范围为其余人员。','convertDraftScopeToPeople() / recipientDisplayItemsForCategory()'],
 ['逐人选择','工作组选择单个或部分成员时，“全选本组”保持未选中且不显示半选；补齐全部当前有效成员后自动归一化为完整范围。','recipientScopeState() / setDraftPerson()'],
 ['交叉范围','同时选择多个范围或明确人员时保留各选择来源，实际人数始终按 personId 全局去重。','recipientResolvedSelection()'],
 ['其他范围覆盖','人员未在当前范围选中但被其他范围覆盖时，标识“已由其他范围选中”。','recipientPersonCoveredByOtherScopes()'],
 ['成员有效性','完整范围只包含 status=active 且 canReceive=true 的人员；范围不存在或有效成员为零时阻止发布。','recipientScopeMembers() / recipientScopeIsInvalid()'],
 ['问卷编辑','草稿与未开始问卷保存范围对象与明确人员；再次编辑时恢复临时副本及原选择语义。','recipientSelections / draftRecipientSnapshot()'],
 ['发布数据','recipientSnapshot 保留 dynamic scope，不在发布时展开人员；填写、人数和统计读取时实时解析。','selectedRecipientSnapshot() / surveyRecipientResolution()'],
 ['学校列表','教育局端学校平铺直选，行内仅展示学校名称和教职工人数，不展示学段或学校类型。','schoolPickerMarkup()'],
 ['学校类型筛选','小学、初中、九年一贯制仅用于筛选学校，不作为学校行展示字段。','state.recipientPickerSchoolType / filteredBureauSchools()']
];
PRD_FIELD_GROUPS.recipientPicker=[
 ['范围选择','部门及有有效成员的工作组提供完整范围复选框；空范围禁用。','data-picker-dynamic-scope'],
 ['人员选择','展开范围后逐人选择；人员复选状态表示当前范围来源，不把其他范围覆盖误判为当前选中。','recipientPersonPickerState()'],
 ['工作组全选状态','仅完整覆盖全部有效成员时“全选本组”显示选中；选择单个或部分成员时保持未选中且不显示半选。','recipientScopeState()'],
 ['范围转人员','动态范围内取消任一成员时删除范围对象，并把其余当前有效成员转成明确人员。','convertDraftScopeToPeople()'],
 ['确认与取消','PC 和移动端均使用临时副本；确认提交当前模块，取消、返回、遮罩或 Escape 回滚。','commitRecipientPicker() / discardRecipientPicker()'],
 ['搜索','搜索仅过滤展示，不改变完整范围成员口径；关键词最多 50 字。','state.recipientPickerSearch / state.recipientPickerGroupSearch'],
 ['来源删除','删除范围标签只删除该范围来源；删除人员标签只删除对应明确人员对象。','data-remove-recipient'],
 ['学校筛选','按学校名称和学校类型过滤；学校行只展示名称与教职工人数。','schoolPickerMarkup() / filteredBureauSchools()']
];
['create-recipients','mobile-recipients','mobile-settings'].forEach(key=>{if(PRD_PAGE_RULES[key])PRD_PAGE_RULES[key].fields=prdFields(...(PRD_PAGE_FIELD_GROUPS[key]||['recipients','recipientPicker']))});
PRD_PAGE_RULES['create-recipients'].goal='在 PC 端选择动态部门、教育局动态工作组或明确人员，并以临时副本确认本模块接收范围。';
PRD_PAGE_RULES['mobile-recipients'].goal='在移动端选择动态部门、教育局动态工作组或明确人员，并保持与 PC 端一致的范围语义。';
PRD_OVERLAY_RULES['recipient-picker']={title:'部门与工作组动态范围选择',goal:'教育局端支持动态部门与动态工作组，学校端支持动态部门；两端均可选择明确人员，并在整个收集期按最新组织成员解析填写资格与统计人数。',fields:prdFields('recipientPicker','recipients')};
renderRecipientPickerPrd=function(rule,key,entryType){
 const features=[
  ['部门选择','动态部门','教育局端、学校端的 PC 与移动端均可主动勾选有有效成员的部门；展开按钮独立操作。','P0','范围标签显示当前人数'],
  ['工作组选择','动态工作组','教育局端的 PC 与移动端可主动勾选有直接有效成员的工作组；纯目录节点仅展开。','P0','空工作组不可勾选'],
  ['成员选择','明确人员','逐人选择保存人员对象；工作组选择单个或部分成员时“全选本组”保持未选中且不显示半选，补齐全部成员后自动归一化为完整范围。','P0','完整覆盖后显示选中'],
  ['选择联动','范围转人员','从动态范围取消任一成员时删除该范围，将其余当前有效成员转换为明确人员。','P0','后续新增成员不自动纳入'],
  ['搜索与事务','过滤及提交','搜索只过滤展示；PC 弹窗和移动分类页使用临时副本，确定提交，取消或返回回滚。','P0','搜索不缩小范围'],
  ['交叉范围','来源与去重','部门、工作组和跨模块成员按 personId 去重；取消一个范围不移除其他范围提供的资格。','P0','保留各选择来源'],
  ['数据保存','保留动态对象','草稿、未开始问卷和发布数据均保留 scope/person 对象；发布时不展开动态范围。','P0','兼容历史人员快照'],
  ['实时解析','资格与人数','填写、统计和人数查询时按当前组织关系解析 active 且 canReceive=true 的成员。','P0','整个收集期实时生效'],
  ['统计口径','历史答卷并集','统计总人数合并当前有效接收人与已有答卷人员；同一人员重复提交只计一名已提交人员。','P0','无人员标识的旧聚合提交仅作为总人数下界'],
   ['异常校验','失效范围','范围被删除、越权或有效成员为零时在草稿中提示重新选择并阻止发布。','P0','不得静默转空'],
   ['学校选择','精简列表','教育局端学校行只展示学校名称与教职工人数；学校类型仅保留为筛选条件。','P0','不展示学段']
 ];
 const payload=`{\n  "recipientSnapshot": [\n    { "personId": "bureau-person-lijing", "name": "李静", "level": "person", "selectionMode": "snapshot", "frozen": true, "sourceCategories": ["department", "workgroup"], "workgroupIds": ["bureau-workgroup-quality"], "workgroupNames": ["教育质量提升工作组"] }\n  ]\n}`;
 return `<article class="prd-document"><header class="prd-document-head"><div><small>${entryType==='page'?'页面':'弹窗'}规则 · ${esc(key)}</small><h2>${esc(rule.title)}</h2></div><button type="button" class="prd-close" aria-label="关闭 PRD 规则">×</button></header><aside class="prd-prerequisite" role="note"><strong>动态范围口径</strong><p>部门与工作组范围在发布数据中保持动态对象，整个收集期按最新有效成员解析。</p><small>明确人员与范围成员统一按 personId 去重；逐人选满全部有效成员后自动归一化为完整范围。</small></aside><section><h3>1. 背景与目标</h3><p>${esc(rule.goal)}</p></section><section><h3>2. 用户与使用场景</h3><p>教育局和学校授权用户在 PC 或移动端创建问卷时，可选择组织范围或具体人员；组织成员变化后，填写资格与统计人数同步更新。</p></section><section><h3>3. 需求范围</h3><h4>In Scope</h4><p>部门动态范围、教育局工作组动态范围、明确人员、搜索过滤、范围转人员、交叉去重、草稿与未开始问卷恢复、填写资格和统计实时解析。</p><h4>Out of Scope</h4><p>组织架构维护、已有人员选择自动迁移为范围、后端定时任务，以及学校范围、家长范围和班级范围的原有模型调整。</p></section><section><h3>4. 功能需求列表</h3>${prdTable(['功能模块','功能点','需求描述','优先级（P0 / P1 / P2）','备注说明'],features)}</section><section><h3>5. 核心流程与交互说明</h3><p>用户可独立点击展开按钮或范围复选框。主动勾选范围后保存 dynamic scope 并覆盖全部当前有效成员；在范围内取消成员后删除 scope，并保存其余当前成员。工作组选择单个或部分成员时“全选本组”保持未选中且不显示半选，逐人补齐全部成员后归一化为完整范围。PC 与移动端确认后提交当前模块临时副本，取消或返回不保存。</p>${prdTable(['字段/信息','限制与展示规则','当前原型来源'],rule.fields||[],'prd-field-table')}</section><section><h3>6. 异常场景与边界条件</h3><p>空部门、空工作组和纯目录节点不可勾选。停用、离职或 canReceive=false 的人员即时失去新提交资格；新调入有效成员即时获得资格。范围缺失或无权访问时在草稿中提示重新选择并阻止发布。已提交答卷不删除。</p></section><section><h3>7. 数据口径与埋点需求</h3><p>动态范围选择键为 department:scope:{departmentId} 或 workgroup:scope:{workgroupId}，对象包含 id、name、category、level=scope、scopeType、selectionMode=dynamic。发布时原样写入 recipientSnapshot，查询时实时解析。总人数为当前有效接收人与已有答卷人员的 personId 并集，并纳入既有非人员范围；同一人员重复答卷只计一名已提交人员，无 personId 的旧聚合提交仅作为总人数下界。记录 recipient_scope_select、recipient_scope_unselect、recipient_scope_convert_to_people、recipient_person_select、recipient_person_unselect、recipient_picker_confirm、recipient_picker_cancel、recipient_scope_invalid，公共属性包含 portal、device、category、scope_id、person_id、selection_mode、module_selected_count、selected_count 和 timestamp。</p><h4>发布数据示例</h4><pre>${esc(payload)}</pre></section><section><h3>8. 风险、依赖与限制</h3><p>正式环境依赖稳定 personId、部门关系、工作组直接成员关系、人员状态和接收权限接口。服务端须在填写、人数和统计查询时使用同一解析器，并校验当前用户是否仍属于有效范围。</p></section><section><h3>9. 验收标准</h3><p>教育局 PC 与移动端支持部门和工作组范围；学校 PC 与移动端支持部门范围。主动范围选择、工作组部分选择无半选且仅完整覆盖时显示选中、范围取消成员转人员、搜索、交叉去重、失效范围、草稿恢复、确定与取消、发布保留 scope、成员增减后的填写资格与统计人数均符合本规则。</p></section></article>`
};

/* Final recipient PRD contract: dynamic leaf departments and fixed non-department selections. */
PRD_FIELD_GROUPS.recipients=[
 ['接收对象模块','教育局端依次为内部部门、工作组、学校；学校端依次为内部部门、家长、班级；每个模块均非必填，但发布前至少选择一项内部范围或开启外部填写。','recipientOverviewTabs() / recipientSelectionError()'],
 ['教育局工作组','固定展示教育质量提升工作组、校园安全工作组、教育数字化工作组；成员分别为李静/周凯/陈洁、王明/吴敏、陈浩/刘洋。','RECIPIENT_WORKGROUP_TREE_V2'],
 ['动态部门','仅末级且存在有效成员的部门支持整选；发布后保留动态部门范围，填写资格、应提交人数和统计按当前有效成员解析。','isDynamicRecipientScope() / recipientScopeMembers() / surveyRecipientResolution()'],
 ['工作组选择','支持人员搜索、逐人选择和全选本组；选择结果按当时成员保存为明确人员，不作为动态工作组范围。','workgroupMemberMarkup() / setDraftPerson() / commitRecipientPicker()'],
 ['跨模块去重','同一 personId 可同时保留内部部门、工作组等来源；预计人数与发布人数全局只计算一次。','recipientResolvedSelection() / selectedRecipientSnapshot()'],
 ['问卷编辑','草稿与未开始问卷保存动态部门范围、明确人员及来源；再次编辑时保持原选择语义，搜索条件不写入问卷数据。','recipientSelections / recipientRules / explicitPersonIds / loadEditableSurveyState()'],
 ['发布数据','动态部门以 dynamic_department 范围写入发布数据；工作组及逐人选择写入明确人员，发布后仅动态部门随组织有效成员变化。','selectedRecipientSnapshot() / recipientSelectionContract()'],
 ['学校选择','教育局端学校行只展示学校名称与教职工人数；学校类型仅用于筛选，不在行内展示学段或类型。','schoolPickerMarkup() / filteredBureauSchools()'],
 ['详情数据范围','教育局端按教育局内部、工作组、学校、外部排序；学校端按学校内部、家长、班级、外部排序；仅展示实际命中项并以“ + ”连接，详情不展示发布渠道。','surveyDataScope()']
];
PRD_FIELD_GROUPS.recipientPicker=[
 ['临时选择','打开 PC 弹窗或移动端分类页时复制当前模块数据；确定提交，取消、返回、遮罩关闭或 Escape 均回滚。','beginRecipientPicker() / commitRecipientPicker() / discardRecipientPicker()'],
 ['部门范围','只有末级有效部门可保存 dynamic_department；非末级部门仅展开，空部门和失效范围不可选择。','data-picker-dynamic-scope / recipientScopeIsInvalid()'],
 ['人员选择','从动态部门取消任一成员后，当前部门转为其余明确人员；被其他来源覆盖时只显示覆盖提示，不误改当前来源。','setDraftPerson() / recipientPersonPickerState()'],
 ['工作组状态','工作组全选和逐人选择均保存明确人员；部分选择显示半选，取消一个工作组来源不移除其他来源。','recipientScopeState() / recipientPersonSourceIds()'],
 ['搜索','姓名或工作组关键词最多 50 个字符；搜索仅过滤当前列表，不改变已选范围和人数口径。','state.recipientPickerPersonSearch / state.recipientPickerGroupSearch'],
 ['学校筛选','支持按学校名称和学校类型筛选；结果行仅展示学校名称与教职工人数。','filteredBureauSchools() / schoolPickerMarkup()']
];
['create-recipients','mobile-recipients'].forEach(key=>{if(PRD_PAGE_RULES[key])PRD_PAGE_RULES[key].fields=prdFields(...(PRD_PAGE_FIELD_GROUPS[key]||['recipients','recipientPicker']))});
PRD_PAGE_RULES['create-recipients'].goal='在 PC 端按模块选择接收对象，保留动态部门与明确人员的来源语义，并支持纯外部问卷发布。';
PRD_PAGE_RULES['mobile-recipients'].goal='在移动端按与 PC 一致的规则选择动态部门或明确人员，并保证确认与取消边界清晰。';
PRD_OVERLAY_RULES['recipient-picker']={title:'接收对象选择',goal:'支持教育局端与学校端按模块选择动态部门或明确人员，保证事务式交互、跨模块去重和发布数据来源准确。',fields:prdFields('recipientPicker','recipients')};
renderRecipientPickerPrd=function(rule,key,entryType){
 const features=[
  ['模块结构','接收分类','教育局端按内部部门、工作组、学校展示；学校端按内部部门、家长、班级展示。','P0','模块均非必填，发布范围至少命中一项'],
  ['教育局工作组','固定数据','展示教育质量提升、校园安全、教育数字化三个工作组及指定成员。','P0','仅教育局端展示'],
  ['内部部门','动态范围','仅末级有效部门支持整选并保存 dynamic_department；收集期按当前有效成员解析。','P0','非末级仅展开，空范围禁用'],
  ['工作组','明确人员','工作组支持搜索、逐人选择、全选本组和部分选择半选；全选保存当时有效成员，不保存动态工作组。','P0','搜索不改变选择结果'],
  ['事务交互','确认与回滚','确定仅提交当前模块；取消、返回、遮罩关闭或 Escape 不保存临时修改。','P0','移动端返回规则一致'],
  ['人员去重','多来源合并','相同 personId 只计一人，同时保留内部部门、工作组等全部来源。','P0','sourceCategories 记录来源'],
  ['问卷编辑','原语义恢复','草稿与未开始问卷保存动态部门、明确人员及来源；再次编辑时完整回填。','P0','不得按 personId 覆盖分类'],
  ['发布数据','范围与人员','动态部门原样保存并实时解析；工作组和逐人选择保存明确人员，发布后不随工作组成员变化扩围。','P0','兼容历史快照'],
  ['学校选择','精简列表','教育局端学校行只展示学校名称和教职工人数；学校类型仅保留为筛选条件。','P0','不展示学段或类型'],
  ['详情展示','动态范围文案','按当前端固定顺序组合实际范围，详情隐藏发布渠道。','P0','未知范围显示“—”']
 ];
 const fields=prdTable(['字段/信息','限制与展示规则','当前原型来源'],rule.fields||[],'prd-field-table');
 return `<article class="prd-document"><header class="prd-document-head"><div><small>${entryType==='page'?'页面':'弹窗'}规则 · ${esc(key)}</small><h2>${esc(rule.title)}</h2></div><button type="button" class="prd-close" aria-label="关闭 PRD 规则">×</button></header><aside class="prd-prerequisite" role="note"><strong>实现口径</strong><p>只有末级部门范围保持动态；工作组及逐人选择按确认时的有效人员保存。</p><small>PC 与移动端共用同一选择、去重和失效校验规则。</small></aside><section><h3>1. 背景与目标</h3><p>${esc(rule.goal)}</p></section><section><h3>2. 用户与使用场景</h3><p>教育局及学校问卷创建人在 PC 或移动端组合选择接收对象，并准确查看各模块选择结果、预计人数及发布后的数据范围。</p></section><section><h3>3. 需求范围</h3><h4>In Scope</h4><p>动态末级部门、教育局工作组明确人员、搜索、全选与逐人选择、事务式确认、跨模块去重、草稿和未开始问卷恢复、实时资格与统计、学校列表精简。</p><h4>Out of Scope</h4><p>组织架构维护、工作组成员后台配置、动态工作组、后端接口和数据库迁移。</p></section><section><h3>4. 功能需求列表</h3>${prdTable(['功能模块','功能点','需求描述','优先级（P0 / P1 / P2）','备注说明'],features)}</section><section><h3>5. 核心流程与交互说明</h3><p>用户进入接收对象步骤，按模块打开选择器并在临时副本中操作。整选末级部门保存动态范围；工作组全选或逐人选择保存明确人员。点击确定提交当前模块，取消类操作回滚；发布后动态部门按最新有效成员解析。</p>${fields}</section><section><h3>6. 异常场景与边界条件</h3><p>非末级部门仅展开，无有效成员、已删除或越权部门不可选择；停用或 canReceive=false 的人员不参与新资格计算；取消类操作不得污染正式选择；同一人员从多个来源命中时只计一人；未选择内部范围且未开启外部填写时阻止发布。</p></section><section><h3>7. 数据口径与埋点需求</h3><p>动态部门使用 department:scope:{departmentId} 与 selectionMode=dynamic_department；工作组和逐人选择使用 personId 及来源 ID。发布数据保留动态部门范围，查询时仅解析 status=active 且 canReceive=true 的当前成员；人员按 personId 去重，非人员范围按 count 累加。记录 recipient_picker_open、recipient_person_select、recipient_scope_select、recipient_picker_confirm、recipient_picker_cancel 和 recipient_publish_validation_failed；【假设】公共属性包含 portal、device、category、scope_id、person_id、selected_count 和 timestamp。</p></section><section><h3>8. 风险、依赖与限制</h3><p>【假设】正式环境由统一身份和组织服务提供稳定 personId、部门层级、成员状态及接收权限；填写与统计接口必须使用同一动态部门解析器，前端去重不能替代服务端校验。</p></section><section><h3>9. 验收标准</h3><p>两端 PC 与移动端仅允许有效末级部门整选；教育局端三个工作组支持搜索、全选和逐人选择但不动态扩围；确认与全部取消路径正确；同一人员跨来源只计一次；草稿和未开始问卷重新编辑回填完整；发布后部门成员变化联动填写资格与统计；学校行不展示学段或类型。</p></section></article>`
};
/* Stable recipient contract captured before optional legacy compatibility layers run. */
PRD_FIELD_GROUPS.recipients=[
 ['接收对象模块','教育局端依次为内部部门、工作组、学校；学校端依次为内部部门、家长、班级；各模块均非必填，但发布前至少命中一项内部范围或开启外部填写。','recipientOverviewTabs() / recipientSelectionError()'],
 ['教育局工作组','固定展示教育质量提升工作组、校园安全工作组、教育数字化工作组；成员分别为李静/周凯/陈洁、王明/吴敏、陈浩/刘洋。','RECIPIENT_WORKGROUP_TREE_V2'],
 ['工作组选择','支持人员搜索、逐人选择和全选本组；选择部分成员时显示半选，只有确定才提交当前模块。','workgroupMemberMarkup() / recipientScopeState() / commitRecipientPicker()'],
 ['跨模块去重','同一 personId 可保留内部部门、工作组等多个来源；预计人数和发布人数只计算一次。','recipientResolvedSelection() / selectedRecipientSnapshot()'],
 ['问卷编辑','草稿与未开始问卷保存范围及明确人员的选择键和来源，恢复时不得按 personId 覆盖跨模块来源。','recipientSelections / rawRecipientSelectionEntries() / loadEditableSurveyState()'],
 ['发布快照','确认发布时按最新有效成员展开范围，按 personId 去重并固化；保存 sourceCategories、departmentSourceIds、workgroupSourceIds、workgroupIds 和 workgroupNames，发布后组织变化不回写。','selectedRecipientSnapshot()'],
 ['学校选择','教育局端学校行仅展示学校名称与教职工人数；学校类型只用于筛选，不在行内展示学段或类型。','schoolPickerMarkup() / filteredBureauSchools()'],
 ['详情数据范围','教育局端按教育局内部、工作组、学校、外部排序；学校端按学校内部、家长、班级、外部排序；详情不展示发布渠道。','surveyDataScope()']
];
PRD_FIELD_GROUPS.recipientPicker=[
 ['临时选择','PC 弹窗和移动端分类页使用临时副本；确定提交，取消、返回、遮罩关闭或 Escape 回滚。','beginRecipientPicker() / commitRecipientPicker() / discardRecipientPicker()'],
 ['范围选择','内部部门和三个教育局工作组支持整组选择；无有效成员的范围不可选择。','data-picker-dynamic-scope / recipientScopeMembers()'],
 ['人员选择','人员状态仅表示当前范围来源；被其他范围覆盖时显示提示，不得误判为当前范围已选。','recipientPersonPickerState()'],
 ['全选状态','未选择为未选中，部分成员为半选，全选本组或逐人选满为选中。','recipientScopeState()'],
 ['搜索','姓名或工作组关键词最多 50 个字符；仅过滤列表，不改变已选范围和人数。','state.recipientPickerPersonSearch / state.recipientPickerGroupSearch'],
 ['学校筛选','支持按学校名称和学校类型筛选；结果行只展示学校名称与教职工人数。','filteredBureauSchools() / schoolPickerMarkup()']
];
['create-recipients','mobile-recipients','mobile-settings'].forEach(key=>{if(PRD_PAGE_RULES[key])PRD_PAGE_RULES[key].fields=prdFields(...(PRD_PAGE_FIELD_GROUPS[key]||['recipients','recipientPicker']))});
PRD_PAGE_RULES['create-recipients'].goal='在 PC 端按模块选择接收对象，保留跨模块来源，并在发布确认时生成不可变人员快照。';
PRD_PAGE_RULES['mobile-recipients'].goal='在移动端按模块选择接收对象，交互与 PC 端一致，并在发布确认时生成不可变人员快照。';
PRD_PAGE_RULES['mobile-settings'].goal='在移动端发布前确认接收对象与收集设置；内部范围为空时可开启外部填写并发布纯外部问卷。';
PRD_OVERLAY_RULES['recipient-picker']={title:'接收对象选择',goal:'支持教育局端与学校端按模块选择接收对象，保证事务式交互、跨模块去重和发布快照来源准确。',fields:prdFields('recipientPicker','recipients')};
renderRecipientPickerPrd=function(rule,key,entryType){
 const features=[
  ['模块结构','接收分类','教育局端按内部部门、工作组、学校展示；学校端按内部部门、家长、班级展示。','P0','至少命中一项范围或开启外部填写'],
  ['教育局工作组','固定数据','展示教育质量提升、校园安全、教育数字化三个工作组及指定成员。','P0','仅教育局端'],
  ['成员选择','搜索与全选','工作组支持搜索、逐人选择、全选本组和部分选择半选；PC 与移动端一致。','P0','搜索不改变选择'],
  ['事务交互','确认与回滚','确定提交当前模块；取消、返回、遮罩关闭或 Escape 不保存临时修改。','P0','移动端返回同规则'],
  ['人员去重','多来源合并','相同 personId 只计一人，同时保留内部部门、工作组等全部来源。','P0','sourceCategories 记录来源'],
  ['问卷编辑','原语义恢复','草稿与未开始问卷保存选择键及来源，再次编辑完整回填。','P0','不得按 personId 覆盖分类'],
  ['发布数据','快照固化','确认发布时展开范围并固化人员快照；发布后组织变化不回写。','P0','保存来源 ID 与工作组名称'],
  ['学校选择','精简列表','教育局端学校行只展示学校名称和教职工人数；学校类型仅保留为筛选条件。','P0','不展示学段或类型'],
  ['详情展示','数据范围','按当前端固定顺序组合实际范围，详情隐藏发布渠道。','P0','未知范围显示“—”']
 ];
 return `<article class="prd-document"><header class="prd-document-head"><div><small>${entryType==='page'?'页面':'弹窗'}规则 · ${esc(key)}</small><h2>${esc(rule.title)}</h2></div><button type="button" class="prd-close" aria-label="关闭 PRD 规则">×</button></header><aside class="prd-prerequisite"><strong>实现口径</strong><p>编辑态保留范围选择语义，发布确认时按 personId 展开并固化人员快照；同一人员的多来源不得丢失。</p><small>PC 与移动端共用同一数据和校验规则。</small></aside><section><h3>1. 背景与目标</h3><p>${esc(rule.goal)}</p></section><section><h3>2. 用户与使用场景</h3><p>教育局及学校问卷创建人在 PC 或移动端组合选择接收对象，并准确查看各模块结果、预计人数和发布后的数据范围。</p></section><section><h3>3. 需求范围</h3><h4>In Scope</h4><p>接收模块、三个教育局工作组、人员搜索、整组与逐人选择、事务式确认、跨模块去重、草稿和未开始问卷恢复、发布快照、学校列表精简及详情数据范围。</p><h4>Out of Scope</h4><p>组织架构维护、工作组后台配置、后端接口和数据库迁移。</p></section><section><h3>4. 功能需求列表</h3>${prdTable(['功能模块','功能点','需求描述','优先级（P0 / P1 / P2）','备注说明'],features)}</section><section><h3>5. 核心流程与交互说明</h3><p>用户按模块打开选择器并在临时副本中操作；工作组可全选或逐人选择，部分选择显示半选。确定提交当前模块；发布确认时展开范围、按 personId 合并并固化快照。学校列表按名称或类型筛选，行内不展示学段或学校类型。</p>${prdTable(['字段/信息','限制与展示规则','当前原型来源'],rule.fields||[],'prd-field-table')}</section><section><h3>6. 异常场景与边界条件</h3><p>无有效成员的范围不可选择；范围删除或越权时阻止发布；取消类操作不污染正式选择；相同人员多模块命中只计一人但保留全部来源；无内部范围且未开启外部填写时阻止发布。</p></section><section><h3>7. 数据口径与埋点需求</h3><p>编辑态使用 category、scopeId、personId 和 sourceScopeIds；发布快照保存 sourceCategories、departmentSourceIds、workgroupSourceIds、workgroupIds、workgroupNames、frozen 和 snapshotAt。人数按 personId 去重。记录 recipient_picker_open、recipient_person_select、recipient_scope_select、recipient_picker_confirm、recipient_picker_cancel 和 recipient_publish_validation_failed；【假设】公共属性包含 portal、device、category、scope_id、person_id、selected_count 和 timestamp。</p></section><section><h3>8. 风险、依赖与限制</h3><p>【假设】正式环境由统一身份和组织服务提供稳定 personId、部门及工作组关系；发布接口必须在同一事务中校验范围并固化快照。</p></section><section><h3>9. 验收标准</h3><p>教育局端仅展示三个指定工作组；PC 与移动端通过搜索、逐人、全选、半选和全部取消路径；同一人员跨内部部门与工作组只计一次且快照保留两个来源；草稿和未开始问卷重新编辑完整回填；学校行不展示学段或类型；详情范围顺序准确且不展示发布渠道。</p></section></article>`
};
const RECIPIENT_V16_APPROVED_CONTRACT=Object.freeze({
 recipientDeepClone,isDynamicRecipientScope,recipientDirectoryPerson,recipientScopeMembers,recipientScopeIsInvalid,normalizeRecipientMap,recipientResolvedSelection,recipientSelectionContract,
 setDraftDynamicScope,setDraftPerson,recipientPersonSelectedInScope,recipientPersonCovered,recipientPersonPickerState,recipientScopeState,recipientCategoryCount,recipientCount,
 selectedRecipientSnapshot,bindRecipientPickerControls,draftPayload,surveyTemplateValue,draftRecipientSnapshot,recipientSelectionError,loadEditableSurveyState,surveyRecipientItems,
 recipientAssignmentTotal,statsSnapshot,statsPeopleData,surveyRecipientResolution,surveyAllowsCurrentPerson,canCreateResponse,
 renderRecipientPickerPrd,recipientFields:PRD_FIELD_GROUPS.recipients.map(row=>[...row]),pickerFields:PRD_FIELD_GROUPS.recipientPicker.map(row=>[...row]),
 pageRules:Object.fromEntries(['create-recipients','mobile-recipients','mobile-settings'].map(key=>[key,{goal:PRD_PAGE_RULES[key]?.goal||'',fields:(PRD_PAGE_RULES[key]?.fields||[]).map(row=>[...row])}])),
 overlayRule:{...PRD_OVERLAY_RULES['recipient-picker'],fields:(PRD_OVERLAY_RULES['recipient-picker']?.fields||[]).map(row=>[...row])}
});

const PRD_V16_PROFILES={
 management:{
  users:'教育局或学校的问卷创建人，在 PC 端检索本人收到或发布的问卷，并按状态执行允许的操作。',
  inScope:'我收到的、我发布的、组合筛选、真实分页、状态操作矩阵、草稿与未开始问卷编辑，以及仅草稿和已暂停问卷的删除确认与软删除。',
  outScope:'移动端我的问卷列表、后端审批流、数据库物理删除和跨组织问卷操作。',
  features:[
   ['问卷查询','组合筛选','按问卷名称、创建人、问卷类型和状态筛选；我收到的与我发布的条件互不串用。','P0','输入最多 50 字'],
   ['状态操作','操作矩阵','操作项按草稿、未开始、进行中、已暂停、已结束分别输出；不符合状态的入口不得渲染。','P0','二维码仅适用于非内部渠道'],
   ['问卷编辑','原记录更新','草稿与未开始问卷按四步流程完整回填；保存或发布沿用原问卷 ID，不新增重复记录。','P0','状态变化时拒绝保存'],
   ['问卷删除','确认与软删除','仅草稿和已暂停问卷可删除；删除前二次确认，确认后从我的问卷、问卷管理、统计及云首页数据源移除。','P0','未开始、进行中、已结束不可删除'],
   ['列表分页','真实分页','PC 支持每页 10、20、50、100 条并正确禁用首尾翻页；移动端不展示分页控件。','P1','筛选后回到第 1 页']
  ],
  flow:'进入“我的问卷”后选择“我收到的”或“我发布的”，配置筛选条件并查看结果；点击操作后先校验问卷归属与实时状态，再进入详情、编辑、统计或确认操作。',
  exceptions:'问卷不存在、已删除、非当前创建人或状态已变化时阻止操作并展示明确反馈；删除确认回调须再次校验实时状态为草稿或已暂停；筛选无结果展示空态；最后一页记录减少后页码回退到有效页。',
  data:'列表仅返回当前组织且当前用户有权访问的未删除问卷。提交人数为内部有效提交与外部有效提交之和。记录 survey_filter、survey_view_switch、survey_action_click、survey_delete_confirm、survey_edit_save；【假设】公共属性包含 portal、org_id、user_id、survey_id、status、action、timestamp。',
  risks:'正式环境依赖问卷权限、状态机和乐观锁。所有编辑、暂停、恢复、结束和删除请求均须由服务端重新校验组织、创建人及当前状态。',
  acceptance:'两端 PC 的筛选、分页及五种状态操作项一致；草稿与未开始编辑完整回填且更新原记录；草稿和已暂停可删除，未开始、进行中与已结束不可删除；删除后各列表同步移除；取消确认时数据不变。'
 },
 response:{
  users:'问卷接收人或通过有效二维码进入的外部填写人，在 PC 或移动端填写、提交及查看答卷。',
  inScope:'七种题型渲染、必答校验、答案采集、提交频次、提交后只读、本人答卷历史、二维码填写实例和提交完成页。',
  outScope:'真实文件上传、真实电子签章、GPS 定位、答卷审核、外部人员身份认证及行政区划字典后台维护。',
  features:[
   ['填写表单','统一题型渲染','PC 与移动端按同一题目结构渲染填空、单选、多选、日期、文件/图片、签名和位置。','P0','旧问卷缺省配置按 false'],
   ['提交校验','必答与格式','提交前校验必答项及题型格式；失败时保留已填写内容并提示首个错误。','P0','多选按数组语义'],
   ['位置填写','省市区弹窗','点击位置字段打开选择层；移动端使用底部面板，PC 使用页面内大尺寸弹窗；两端均按省、市、区县逐级选择并在区县确认后回填。','P0','未完成三级选择不形成有效答案'],
   ['提交频次','次数控制','单次问卷最多新增一份；每日问卷每个业务日最多一份。','P0','以业务时区自然日判断'],
   ['提交后只读','禁止修改','答卷提交成功后永久只读，不展示修改按钮，不提供修改确认操作；直接访问旧编辑地址时返回只读答卷。','P0','PC、移动端一致'],
   ['答卷历史','有效记录','本人答卷仅展示有效记录，按提交时间倒序，并保留答卷编号。','P1','无记录展示空态']
  ],
  flow:'进入填写页后加载问卷题目；用户完成输入并提交，系统依次校验访问资格、状态、频次和答案。提交成功后写入答卷并进入结果页，后续仅可查看答卷内容。',
  exceptions:'未开始、暂停、结束、删除、越权或超出提交次数时禁止提交；仅图片题选择非图片后清空；省市区未完成三级选择或关闭选择面板时不覆盖原值；签名演示取消时保持未填写；通过旧链接或构造参数请求修改已提交答卷时拒绝写入。',
  data:'答案按“题目标题 + 答案值”兼容保存；多选展示时连接为可读文本，文件保存文件名，位置按“省-市-区县｜详细地址”保存。正式环境行政区划读取统一标准字典并按版本管理。记录 response_open、response_submit、response_validation_failed；【假设】公共属性包含 survey_id、response_id、question_count、frequency、submit_date、timestamp，禁止上报答案正文。',
 risks:'正式环境依赖问卷访问鉴权、幂等提交、文件安全扫描、签名能力及标准行政区划字典。服务端必须拒绝所有已提交答卷更新请求，前端隐藏入口不能替代服务端限制。',
  acceptance:'七种题型在 PC 与移动端展示和采集一致；位置题在移动端以底部面板依次选择省、市、区县，PC 以大尺寸弹窗完成相同步骤，不展示三个并排下拉框；未完整选择时不形成有效答案，关闭选择层不覆盖原值，已有答案可正确回显；必答、图片限制、日期时分和详细地址规则正确；提交频次控制正确；已提交答卷在 PC 与移动端仅可查看且无法通过旧地址或构造请求修改。'
 },
 responseDetail:{
  users:'具有当前组织问卷查看权限的教育局或学校用户，在“问卷管理”详情中查看一份可识别的内部人员答卷。',
  inScope:'问卷名称、答卷编号、内部提交人元数据、提交状态与时间、逐题答案、返回问卷详情及访问校验。',
  outScope:'外部人员答卷明细、答卷编辑、答案导出、跨组织访问和已失效答卷恢复。',
  features:[
   ['答卷信息','内部提交人','展示答卷编号、姓名、所属组织、身份、手机号、有效状态和提交时间。','P0','仅内部可识别人员'],
   ['问卷内容','逐题答案','按原问卷题目顺序展示题号、标题、题型和本次答案；空答案显示“—”。','P0','只读展示'],
   ['访问控制','路由鉴权','问卷和答卷均须属于当前组织且未删除、未失效；外部答卷不提供详情路由。','P0','直链同样校验'],
   ['页面返回','上下文保持','返回当前问卷详情，不跳转到其他问卷或统计日期。','P1','保留 surveyId']
  ],
  flow:'从“问卷管理”详情的内部答卷列表点击“查看答卷”，系统按问卷 ID 和答卷 ID 校验组织、删除状态及有效性；校验通过后展示提交人元数据与逐题答案，返回时回到原问卷详情。',
  exceptions:'问卷不存在、已删除、答卷不存在、答卷失效、答卷属于外部人员或不属于当前组织时展示“答卷不存在或无权查看”，且不输出提交人及答案数据。',
  data:'详情数据来自内部有效答卷记录，题目按当前问卷保存顺序关联。记录 response_detail_open、response_detail_denied；【假设】公共属性包含 portal、survey_id、response_id、result、timestamp，禁止上报答案正文和手机号。',
  risks:'正式环境必须由服务端校验组织边界、答卷有效性和内部人员属性；前端路由隐藏不能替代鉴权，敏感字段须按权限脱敏。',
  acceptance:'内部有效答卷可查看且题目顺序、答案和提交信息准确；外部、失效、已删除或跨组织答卷均无法通过列表或直链访问；返回路径正确。'
 },
 directory:{
  users:'具有组织问卷查看权限的教育局或学校用户，在 PC 端通过“问卷管理”浏览组织问卷、问卷配置及内部人员答卷。',
  inScope:'已发布问卷的组织级筛选、分页、只读详情、接收数据范围、题目结构、内部答卷列表和答卷详情。',
  outScope:'草稿展示、问卷编辑、外部人员答卷明细、跨组织数据、已删除问卷恢复和统计口径配置。',
  features:[
   ['问卷管理','组织范围列表','仅展示当前组织内已发布且未删除的问卷，草稿仅保留在“我的问卷”；支持名称、创建人、日期和状态筛选。','P0','状态筛选不提供草稿选项'],
   ['问卷详情','配置只读','展示基础信息、收集设置、实际接收范围和题目，不提供编辑入口。','P0','不展示发布渠道'],
   ['答卷明细','内部人员限定','仅内部人员有效提交可进入答卷详情；外部答卷不得生成或命中详情路由。','P0','与统计明细同口径'],
   ['统计入口','上下文返回','从列表进入统计详情时记录返回来源，返回后保留列表上下文。','P1','教育局与学校一致']
  ],
  flow:'用户在“问卷管理”筛选组织问卷，进入问卷详情查看配置与内部答卷列表；点击内部答卷查看题目答案，或进入统计详情；返回时回到原列表或详情。',
  exceptions:'问卷或答卷不存在、已删除、不属于当前组织、外部答卷或动态参数非法时展示无权查看空态；不得回退为其他问卷数据。',
  data:'问卷列表按当前组织、status!=draft 和 deleted!=1 条件过滤。答卷详情按 surveyId、responseId、内部人员标识联合查询。记录 survey_directory_filter、survey_detail_open、response_detail_open；【假设】公共属性包含 org_id、survey_id、response_id、source_page、timestamp。',
  risks:'正式环境须由服务端执行组织级数据权限和答卷级权限校验；前端隐藏外部详情入口不能替代接口拒绝。',
  acceptance:'两端问卷管理列表均不展示草稿且无草稿筛选项，草稿仍在“我的问卷”的“我发布的”中展示；其他状态筛选和分页正确；详情字段与发布快照一致；内部答卷可查看，外部、已删除及跨组织答卷均无法通过直链访问。'
 },
 basic:{
  users:'问卷创建人或模板维护人，在新增、编辑草稿、编辑未开始问卷或维护模板时录入基础信息。',
  inScope:'标题、问卷类型、说明、实时草稿状态、步骤导航和基础字段校验。',
  outScope:'题目编辑、接收对象、收集设置、统计和后端类型维护。',
  features:[
   ['基础信息','标题','标题必填，去除首尾空格，最多 50 个字符。','P0','错误停留第 1 步'],
   ['基础信息','问卷类型','必须选择当前组织有效类型；失效类型不得保存。','P0','模板同规则'],
   ['基础信息','填写说明','说明选填，最多 500 个字符。','P1','PC 与移动端一致'],
   ['编辑回填','原值恢复','编辑时恢复标题、类型和说明，并与后续步骤使用同一草稿状态。','P0','不得创建重复记录']
  ],
  flow:'进入基础信息步骤后录入或修改字段；点击下一步先采集输入并校验，通过后进入问卷设计。普通问卷继续后续配置，模板在问卷设计步骤直接保存。',
  exceptions:'问卷标题或模板名称为空、超长，或类型失效时阻止进入下一步；编辑对象不存在、已删除、越权或状态变化时退出编辑并提示。',
  data:'保存 title、description、surveyTypeId。记录 create_basic_open、create_basic_next、create_basic_validation_failed；【假设】公共属性包含 portal、survey_id、template_id、edit_mode、field_name、timestamp。',
  risks:'正式环境依赖问卷类型有效状态和并发编辑控制；历史类型失效时需要明确重新选择。',
  acceptance:'新增问卷、草稿、未开始问卷及模板的字段限制一致；回填完整；校验失败不丢失输入；保存原记录时 ID 不变。'
 },
 editor:{
  users:'问卷创建人在 PC 或移动端直接编辑题目结构；模板维护人在 PC 端编辑模板题目。',
  inScope:'双栏设计器、完整题目卡片、题型只读展示、题库添加、题目与选项排序、必答和专属设置、复制删除及统一校验。',
  outScope:'复杂逻辑跳转、矩阵题、评分题、题库后台维护、真实文件上传及协同编辑。',
  features:[
   ['编辑布局','卡片内联编辑','移除右侧题目设置模块；标题、选项、必答和题型专属设置均在原题目卡片中完成。','P0','普通问卷 PC 与移动端同结构；模板维护仅 PC'],
   ['题型展示','创建后只读','题型在新增题目时确定；加入问卷或模板后仅展示只读文本标签，不生成或监听题型变更控件。','P0','更换题型须删除原题并重新添加'],
   ['题目添加','点击与拖放','PC 题库点击追加，拖入可指定插入位置；移动端通过添加问题层新增。','P0','最多 100 题'],
   ['结构操作','排序复制删除','题目通过拖拽柄排序；“…”菜单提供上移、下移、复制、删除，删除须二次确认。','P0','无效落点不改顺序'],
   ['选择题','选项编辑','单选、多选支持 2～20 个非空选项的新增、修改、删除和拖动排序。','P0','单项最多 50 字'],
   ['题型设置','专属配置','文件/图片支持仅图片，日期支持时分，位置填写固定为省市区三级选择并支持可选详情地址；缺失字段按 false。','P0','完整克隆与回填'],
   ['统一校验','首错定位','下一步、保存草稿、保存模板和发布前执行相同校验并定位首个错误题目。','P0','错误题目高亮']
  ],
   flow:'从题库点击或拖入题目，题型在新增时确定；加入后在卡片内修改标题、选项和设置，并通过拖拽柄或菜单调整结构。复制题目、模板加载与草稿恢复均保留原题型；离开设计步骤前执行统一校验。',
   exceptions:'题目为空、超过 100 题、标题为空或超长、选择题选项少于 2 项、超过 20 项、选项为空或超长时阻止继续；用户需要更换题型时删除原题并重新添加；拖拽取消或落点无效时保持原顺序。',
   data:'题目保存 id、type、title、required、options、imageOnly、includeTime、detailedAddress。记录 question_add、question_reorder、question_copy、question_delete、question_setting_change、question_validation_failed；【假设】公共属性包含 survey_id、template_id、question_id、question_type、from_index、to_index、timestamp。',
  risks:'触摸拖动须避免抢占输入、开关和菜单事件；结构变更须保持稳定题目 ID；正式保存依赖版本号防止覆盖并发编辑。',
   acceptance:'新增问卷、草稿编辑、未开始编辑和 PC 模板维护均无右侧设置栏；七种题型加入后仅展示只读类型且无法打开下拉或改变题型；复制、模板加载和草稿恢复保留原题型与完整结构；专属设置可回填；题目与选项排序正确；所有保存入口使用同一校验。'
 },
 collection:{
  users:'问卷创建人，在 PC 或移动端配置发布范围、收集周期及提醒。',
  inScope:'外部填写、收集方式、日期、非工作日规则、每日提醒、提醒时间、联动清理和发布校验。',
  outScope:'真实节假日日历、消息发送任务、二维码短链服务、历史问卷补录和数据库迁移。',
  features:[
   ['外部填写','发布范围','开启后支持二维码填写；内部接收范围与外部填写至少满足一项。','P0','支持纯内部、混合和纯外部'],
   ['收集方式','两种提交频次','支持仅提交一次、每日收集一次；切换后规范化不适用字段。','P0','问卷新建与编辑共用'],
   ['收集日期','业务时区','开始和截止日期必填且有序；按 Asia/Shanghai 自然日计算问卷状态。','P0','日期格式 YYYY-MM-DD'],
   ['每日规则','开关联动','非每日方式隐藏三项每日配置并清空；每日模式显示非工作日与提醒，开启提醒后显示提醒时间。','P0','默认提醒时间 09:15'],
   ['发布校验','范围与时间','发布或保存前统一校验接收范围、日期和提醒时间。','P0','错误不改变原数据']
  ],
  flow:'进入收集设置后确认接收人员，配置外部填写、收集方式和日期；每日模式继续配置非工作日及提醒。提交前规范化字段并统一校验，通过后发布或更新原问卷。',
  exceptions:'内部范围和外部填写均为空、日期缺失、截止早于开始、每日提醒开启但时间为空时阻止提交；切回任一非每日方式时隐藏三项每日设置，并将字段保存为 false、false、空。',
  data:'保存 allowExternal、frequency、startDate、endDate、skipNonWorkday、dailyReminder、reminderTime。记录 collection_setting_change、recipient_publish_validation_failed、survey_publish、survey_status_auto_changed；【假设】公共属性包含 survey_id、frequency、status、start_date、end_date、timestamp。',
  risks:'真实非工作日判断和提醒依赖服务端日历、调度和消息系统；多端必须使用统一业务时区和幂等发布接口。',
  acceptance:'教育局、学校的 PC 与移动端字段顺序和联动一致；两种收集方式来回切换无脏值；非每日方式不展示三项每日设置；范围、日期和提醒校验正确；发布后的未开始、进行中和已结束状态正确。'
 },
 templates:{
  users:'教育局或学校的问卷创建人在 PC 端筛选、使用并维护问卷模板；移动端仅筛选、使用模板创建问卷。',
  inScope:'模板类型筛选、系统与自定义模板、PC 端两步新增编辑、基础信息、题目结构、分页，以及从“我的问卷”选择模板创建问卷。',
  outScope:'模板维护页直接编辑接收人员与收集设置、跨组织共享、模板审核、版本市场、批量导入导出和系统模板原位修改。',
  features:[
   ['模板列表','筛选与分页','模板中心按名称和问卷类型筛选；PC 从模板创建弹窗使用独立筛选与分页状态。','P0','端内数据隔离'],
   ['系统模板','只读使用','系统模板仅提供“使用模板”，不允许原位编辑或删除。','P0','模板源数据不变'],
   ['自定义模板','新增与编辑','PC 按“基础信息、问卷设计”两步维护，第二步直接保存模板。','P0','同名校验'],
   ['模板应用','弹窗整行选择','PC 在我的问卷打开模板弹窗，列表仅展示序号、模板名称、问卷类型和创建时间；点击整行后带入标题、类型、说明和题目并进入基础信息。','P0','模板源数据不变'],
   ['移动选择','类型弹层','移动端问卷类型单选，无效类型自动回退全部。','P1','选择后刷新模板结果']
  ],
  flow:'用户在“我的问卷”点击从模板创建后打开居中弹窗，按模板名称或问卷类型筛选，点击整行或按 Enter、Space 立即应用模板并进入新增问卷基础信息；关闭按钮、遮罩和 Escape 仅关闭弹窗。PC 模板中心继续用于维护和使用模板，移动端继续使用原模板选择页。',
  exceptions:'模板不存在、已删除或关联类型失效时阻止进入新增问卷并提示重新选择；筛选无结果展示空态；关闭弹窗不改变我的问卷筛选状态；同名或系统模板直接编辑时阻止保存。',
  data:'模板仅保存 id、title、description、summary、surveyTypeId、questions、creator、createdAt、source，可保留 demoRank 内部排序字段。旧模板中的接收人员与发布配置读取时忽略，再次保存时清除。记录 template_filter、template_use、template_save、template_validation_failed；【假设】公共属性包含 portal、template_id、source、survey_type_id、timestamp。',
  risks:'模板结构演进须保持旧字段兼容；系统模板更新不得覆盖用户自定义模板；服务端须按组织隔离。',
  acceptance:'教育局端和学校端 PC 从模板创建均以居中弹窗完成，独立名称与类型筛选、四列列表、分页、整行鼠标及键盘选择、三种关闭方式和旧地址兼容正确；选择后从基础信息开始且模板源数据不变。模板中心维护及移动端类型筛选和模板创建流程无回归。'
 },
 types:{
  users:'教育局或学校的类型维护人员，在 PC 端筛选、新增、编辑和删除自定义问卷类型。',
  inScope:'名称筛选、系统预置类型只读、自定义类型增删改、关联问卷与模板计数、创建信息和删除校验。',
  outScope:'跨组织类型共享、系统类型修改、类型合并、历史问卷类型迁移和审批。',
  features:[
   ['类型列表','查询与计数','按名称筛选并展示问卷数、模板数、创建人和创建时间。','P0','PC 真实分页'],
   ['系统类型','只读展示','系统预置类型不展示来源标签，操作单元格为空，创建时间使用应用首次打开时间。','P0','底层仍禁止修改'],
   ['自定义类型','新增编辑','名称必填且端内唯一，说明选填；保存后立即刷新列表。','P0','名称最多 20 字'],
   ['自定义类型','删除约束','存在关联问卷或模板时禁止删除；无关联时二次确认后删除。','P0','系统类型不可删除']
  ],
  flow:'输入关键词筛选类型；新增或编辑时打开表单，校验名称和说明后保存；删除前校验来源及关联数量并进行确认。',
  exceptions:'名称为空、超长、重名，说明超长，系统类型操作，存在关联数据或类型已不存在时阻止提交并提示。',
  data:'类型保存 id、name、description、source、creator、createdAt；关联数量按当前组织未删除问卷和模板动态统计。记录 survey_type_filter、survey_type_create、survey_type_update、survey_type_delete_failed、survey_type_delete；【假设】公共属性包含 type_id、source、related_survey_count、related_template_count、timestamp。',
  risks:'删除约束必须由服务端事务校验；首次打开时间仅为原型展示字段，生产环境使用系统类型发布日期。',
  acceptance:'两端系统类型无操作入口且时间稳定；自定义类型校验、编辑、删除和关联限制正确；分页与筛选后的计数一致。'
 },
 auth:{
  users:'教育局端问卷管理员，查看授权对象并通过页面入口发起新增或编辑授权。',
  inScope:'授权对象列表、人员与部门信息、创建范围、结果权限、启用状态、分页，以及新增授权和编辑入口的原型反馈。',
  outScope:'统一身份管理、角色创建、审批配置、权限继承计算，以及新增或编辑授权的表单、持久化和真实接口。',
  features:[
   ['权限列表','授权对象','展示人员、部门或角色及其问卷创建范围。','P0','教育局端'],
   ['结果权限','数据范围','展示可查看的结果范围和当前启用状态。','P0','当前为演示数据'],
   ['授权维护','新增入口','页面顶部展示“添加授权”，点击后给出演示反馈，不写入新记录。','P1','真实表单不在本期原型'],
   ['授权维护','编辑入口','每条记录展示“编辑”，点击后给出演示反馈，不修改当前权限。','P1','真实保存不在本期原型'],
   ['分页','列表浏览','按统一 PC 分页规则展示授权记录。','P1','筛选变化回第 1 页']
  ],
  flow:'管理员进入权限管理，浏览授权对象及其创建、查看范围；可点击“添加授权”或记录“编辑”入口，当前原型仅反馈操作已接收，不新增或修改数据。',
  exceptions:'无权限、对象失效或数据加载失败时展示空态，不得显示其他组织记录；重复点击演示入口不得产生重复记录。',
  data:'列表使用当前教育局演示授权数据。【假设】正式数据包含 subjectType、subjectId、createScope、resultScope、status、updatedAt，并记录 auth_list_open、auth_create_open、auth_edit_open，不采集敏感身份属性。',
  risks:'正式实现依赖统一身份和组织权限服务；前端展示结果不作为授权依据，接口必须强制鉴权。',
  acceptance:'仅教育局授权管理员可访问；列表字段、分页和状态展示正确；新增与编辑入口均可触发演示反馈且不改变数据；越权和加载失败展示明确空态。'
 },
 approval:{
  users:'具有发布审批权限的教育局管理员，处理超出申请人授权范围的问卷发布申请。',
  inScope:'待审批列表、申请范围、申请时间、申请原因、同意、驳回和结果状态。',
  outScope:'多级会签、转审、撤回、催办、通知中心和真实审批接口。',
  features:[
   ['审批列表','申请信息','展示问卷、申请人、申请范围、时间和原因。','P0','时间精确到秒'],
   ['审批操作','同意与驳回','提交后当前记录切换为结果状态，重复操作不可用。','P0','须二次鉴权'],
   ['分页','待办浏览','按统一 PC 分页规则展示审批记录。','P1','结果保留当前页']
  ],
  flow:'审批人查看申请详情，选择同意或驳回；系统确认审批资格和申请状态后写入结果并更新列表。',
  exceptions:'申请不存在、已处理、审批人越权或网络失败时不得覆盖原结果；重复点击应幂等。',
  data:'【假设】记录 approval_view、approval_approve、approval_reject、approval_conflict；公共属性包含 application_id、survey_id、applicant_id、result、timestamp，不上报申请原因全文。',
  risks:'正式实现依赖权限服务、审批状态机、操作审计和消息通知；审批结果必须与问卷发布事务一致。',
  acceptance:'申请字段完整；同意和驳回仅可执行一次；冲突与越权被阻止；分页切换不丢失已处理状态。'
 },
 stats:{
  users:'教育局或学校的问卷发布人及获授权统计人员，在 PC 或移动端查看进度、人员明细和逐题结果。',
   inScope:'统计列表、累计与按日快照、已提交、未提交、外部提交数、完成率四项统计卡片、提示图标、内外部口径、明细过滤下载、题目统计和无任务空态。',
  outScope:'跨问卷分析、实时大屏、外部人员身份明细、统计口径自定义和后端数据仓库。',
  features:[
    ['数据统计','四项卡片','详情稳定展示已提交、未提交、外部提交数、完成率；纯外部问卷依次显示 0、“—”、N、“—”，PC 四列、移动端 2×2。','P0','无任务日期时展示整块空态'],
    ['统计口径','内外部分离','已提交和未提交只计算内部接收人员；外部提交数单独统计有效外部答卷份数；完成率只按内部提交进度计算。','P0','内部应提交为 0 时不计算完成率'],
    ['提示说明','详情页提示','统计列表不显示提示图标；进入统计详情后四项指标显示可聚焦提示图标，PC 悬浮或聚焦、移动端点击或聚焦展示指定文案。','P0','文案不得改写'],
   ['每日统计','日期联动','默认昨天，无昨日任务回退最近任务日；切换后联动指标、明细、下载和题目统计。','P0','未来日期不可选'],
   ['人员明细','仅内部可见','已提交明细和下载仅含内部人员；存在外部提交时展示不可查看提示。','P0','外部明细路由拒绝'],
   ['题目统计','按题型展示','全部七种题型使用对应统计视图；标题下方不展示解释性文字。','P0','无任务显示空态']
  ],
  flow:'从统计列表或问卷管理进入统计详情；普通问卷加载累计快照，每日问卷确定默认日期。用户切换日期或题目后刷新同一快照下全部数据；进入人员明细时仅加载内部人员记录。',
   exceptions:'没有可统计任务日时整块展示空态并禁用明细；应提交内部人数为零时已提交显示 0，未提交和完成率均为“—”；外部提交不得生成可访问人员详情；拆分字段均缺失的旧混合问卷沿用旧口径归入内部。',
   data:'已提交=internalDone；未提交=max(0,internalTotal-internalDone)；外部提交数=externalDone；完成率=round(internalDone÷(internalDone+pending)×100%)，internalTotal=0 时为 null 并映射为“—”。statsSnapshot.submitted 保留内外部合计语义供题目统计兼容。每日日期状态按 surveyId 保存。记录 stats_date_change、stats_detail_open、stats_people_open、stats_download；仅统计详情记录 stats_tip_open。【假设】公共属性包含 survey_id、stats_date、internal_done、external_done、submitted、internal_total、rate、timestamp。',
  risks:'正式环境须保证指标、明细、下载和题目聚合来自同一统计快照；外部人员无稳定身份时不得提供明细；业务时区和任务生成日必须统一。',
   acceptance:'纯内部、混合和纯外部问卷的四项统计与计算正确；纯外部显示 0、—、N、—；混合问卷的已提交和完成率不包含外部提交；移动端统计列表无提示图标，进入统计详情后四项提示文案完全一致；外部提交不出现在明细和下载；每日默认日期、回退和整页联动正确。'
 },
 statsActions:{
  users:'问卷发布人在移动端统计详情中，根据问卷实时状态执行可用的管理操作。',
  inScope:'二维码、暂停、恢复、结束、删除、取消关闭、状态二次校验和操作确认。',
  outScope:'草稿编辑、批量操作、状态撤销、已结束问卷删除和后端状态机实现。',
  features:[
   ['渠道操作','二维码','问卷允许外部填写或渠道非内部时展示二维码；内部问卷不展示。','P0','非草稿问卷'],
   ['进行中','暂停与结束','展示暂停、结束，不展示删除；执行前二次确认。','P0','状态实时复核'],
   ['已暂停','恢复、结束与删除','展示恢复、结束、删除；删除是该统计操作面板唯一可用的删除状态。','P0','删除后二次确认'],
   ['未开始','结束','允许提前结束；不展示暂停、恢复或删除。','P1','二维码按渠道判断'],
   ['已结束','只读操作','仅保留适用的二维码，不展示状态变更或删除。','P0','统计详情仍可查看'],
   ['弹层关闭','无副作用','关闭、取消或点击遮罩不改变问卷状态。','P0','返回统计详情']
  ],
  flow:'在移动端统计详情点击更多操作；系统按实时状态和渠道生成按钮。选择二维码直接打开二维码层，选择暂停、恢复、结束或删除先关闭操作层并进入确认；确认成功后刷新统计详情，取消时保持原状态。',
  exceptions:'问卷已删除、状态在点击后变化或当前用户无管理权限时阻止操作；进行中与已结束不得通过构造事件删除；内部问卷不得打开外部二维码。',
  data:'按钮矩阵由 s.status、s.channel 和 s.allowExternal 决定。记录 stats_action_sheet_open、stats_action_click、survey_status_change、survey_delete_confirm；【假设】公共属性包含 survey_id、status_before、action、channel、result、timestamp。',
  risks:'正式环境必须由服务端基于最新状态、创建人及组织权限校验操作；确认层不能替代幂等与并发控制。',
  acceptance:'各状态按钮与矩阵一致；只有已暂停在统计操作面板出现删除；进行中和已结束无法删除；二维码渠道判断正确；所有取消路径不改变数据。'
 },
 assetPreview:{
  users:'具有问卷统计权限的教育局或学校用户，在题目统计中查看一份图片或签字资源。',
  inScope:'图片或签字预览、资源标题、提交人、提交时间、关闭和遮罩退出。',
  outScope:'资源下载、编辑、另存到资源中心、目录选择、批量预览和真实文件服务。',
  features:[
   ['资源预览','图片与签字','根据当前统计资源类型展示图片或签字内容。','P0','只读弹层'],
   ['上下文信息','标题与提交元数据','展示资源标题、提交人和提交时间；缺失值按空值规则处理。','P0','不展示其他答卷'],
   ['弹层关闭','状态保持','关闭按钮或遮罩退出后返回原题目统计位置，不改变选择状态。','P0','不触发下载或保存']
  ],
  flow:'用户在图片或签字题统计中点击可预览资源；系统读取当前资源类型及元数据并打开只读弹层；关闭后回到原统计页面。',
  exceptions:'资源不存在、类型不支持、无权访问或问卷已删除时不展示内容并给出明确反馈；空标题不得影响关闭操作。',
  data:'预览上下文读取 statPreview、previewTitle、previewSubmitter 和 previewTime。记录 stat_asset_preview_open、stat_asset_preview_close；【假设】公共属性包含 survey_id、question_id、asset_type、response_id、timestamp，不上报资源正文。',
  risks:'正式环境依赖附件访问鉴权和临时读取地址；预览地址不得绕过问卷、答卷及组织权限。',
  acceptance:'图片与签字均可在有权限时正确预览；标题及提交元数据准确；无权或资源失效时不可见；关闭后原统计上下文保持不变。'
 },
resource:{
  users:'具有问卷统计权限的学校端用户，将文件上传题收集的全部附件统一保存至校园资源。',
  inScope:'校园资源应用开通校验、整题附件全量保存、父目录选择、自定义子文件夹、名称长度与重名校验、保存进度。',
  outScope:'逐个选择附件、排除附件、教育局端保存、保存到本地、多级文件夹创建、任务取消、文件明细与结果汇总展示。',
  features:[
   ['能力入口','开通校验','学校端文件上传题展示“另存为”；点击时校验校园资源应用，未开启则提示联系学校管理员开通。','P0','服务端仍须鉴权'],
   ['附件范围','整题全量','点击“另存为”即纳入该题全部有效上传文件，不提供逐个选择、取消选择或排除能力。','P0','包含分页外数据'],
   ['目录选择','选择父目录','用户在我的资源或学校资源中选择一个具有写入权限的父目录。','P0','确认后进入子文件夹命名'],
   ['新建文件夹','名称校验','在所选目录下新建自定义子文件夹；名称必填、最多20个字符，且不得与同级已有文件夹重名。','P0','重名时保留输入内容'],
   ['保存任务','简洁进度','将该题全部文件保存到新建子文件夹；任务执行期间仅展示进度条及百分比。','P0','运行中防重复']
  ],
  flow:'用户点击文件上传题的“另存为”；系统默认获取该题全部有效附件并校验校园资源应用；用户选择父目录并确认；输入新建子文件夹名称；校验通过后创建文件夹、启动保存任务并仅展示进度条。',
  exceptions:'校园资源未开启、附件为空、目录只读、名称为空、名称超过20字符、同级文件夹重名、容量不足或已有任务运行时阻止创建。',
  data:'任务范围为点击时该题全部有效附件；文件夹名称去除首尾空格后校验，同级名称按不区分大小写比对。记录 resource_save_click、resource_app_check、resource_parent_folder_confirm、resource_subfolder_submit、resource_save_start、resource_save_complete；【假设】公共属性包含 survey_id、question_id、target_space、parent_folder_id、file_count、job_id、timestamp，不采集文件及文件夹名称。',
  risks:'正式实现依赖校园资源开通状态、目录写权限、同级目录实时查询、存储容量、附件有效性和异步任务接口；服务端必须在创建时重新执行权限与重名校验。',
  acceptance:'未开启应用时提示准确；点击后默认保存整题全部文件且无选择控件；父目录确认后必须新建子文件夹；名称上限和重名校验有效；保存阶段仅展示进度条。'
 },
 mobileList:{
  users:'教育局或学校的移动端接收人，按填写状态查看本人当前可访问的问卷。',
  inScope:'待填写与已填写筛选、问卷状态、截止日期、进入填写或查看答卷和移动云首页入口。',
  outScope:'移动端我发布的管理列表、问卷批量操作、复杂筛选和 PC 分页。',
  features:[
   ['填写列表','状态筛选','按未填写和已填写查看本人问卷；未提交成功前均归入未填写。','P0','仅当前用户接收范围'],
   ['问卷访问','状态校验','点击时重新校验未删除、接收资格、问卷状态和提交频次。','P0','直链同样校验'],
   ['页面跳转','填写与查看','未提交进入填写；已有有效答卷进入查看；符合条件时可修改。','P0','保留返回路径'],
    ['云首页','最新五条问卷','展示当前组织最新五条已发布问卷、状态与截止时间，点击进入统计详情。','P1','未开始同步展示']
  ],
   flow:'进入移动填写列表并选择状态；点击问卷后校验访问资格，进入填写或答卷查看；返回时回到原筛选。移动云首页展示当前组织最新五条已发布问卷，点击进入统计详情。',
  exceptions:'未开始、暂停、结束、删除、移出接收范围或已达提交上限时禁止新增提交并展示对应提示；无结果展示空态。',
  data:'列表仅包含 received=true、deleted!=1 且处于允许展示状态的问卷。记录 mobile_fill_filter、mobile_survey_open、mobile_access_denied；【假设】公共属性包含 user_id、survey_id、fill_status、survey_status、timestamp。',
  risks:'接收范围为动态组织时须在每次进入和提交前实时解析；移动缓存不得绕过状态及权限变化。',
   acceptance:'两端移动列表仅展示本人有权访问的问卷；筛选、填写、查看、修改和返回正确；移动云首页展示当前组织最新五条已发布问卷并进入统计详情；状态或接收资格变化后旧链接不可继续提交。'
 },
 qr:{
  users:'问卷发布人查看或下载外部填写二维码，外部填写人通过扫码进入问卷。',
  inScope:'二维码生成、状态说明、下载文件名、扫码填写实例和提交状态校验。',
  outScope:'真实短链、微信授权、二维码失效策略、传播分析和外部身份认证。',
  features:[
   ['二维码','内容生成','按端、问卷 ID、渠道和标题生成二维码内容。','P0','非内部渠道'],
   ['二维码','状态控制','进行中可扫码提交；暂停、未开始和结束时保留二维码但禁止提交。','P0','提交前再次校验'],
   ['二维码','下载','文件名由问卷标题生成并清理非法字符。','P1','本地下载'],
   ['扫码实例','问卷填写','按实际题目结构展示移动填写实例。','P1','原型模拟']
  ],
  flow:'发布成功或点击二维码操作后展示二维码；用户可下载或打开扫码实例；扫码提交前校验问卷状态和外部填写权限。',
  exceptions:'内部问卷不展示二维码；问卷已删除、外部填写关闭或状态不可提交时拒绝答卷写入；非法标题使用安全文件名。',
  data:'二维码载荷包含 portal、surveyId、channel、title。记录 qr_view、qr_download、qr_scan_open、external_submit_denied；【假设】正式载荷改用不可猜测短令牌，不包含敏感字段。',
  risks:'正式环境须使用签名短链、有效期和风控策略；二维码图片本身不得成为绕过问卷状态与权限的凭证。',
  acceptance:'仅适用问卷展示二维码；下载文件名合法；进行中可进入填写，其他状态不可提交；扫码实例题型与问卷一致。'
 },
 confirmation:{
  users:'执行发布、提交、暂停、恢复、结束或删除等关键操作的授权用户。',
  inScope:'操作标题、影响说明、确认、取消、遮罩关闭、键盘关闭和回调执行顺序。',
  outScope:'批量审批、操作撤销、短信确认和后端事务实现。',
  features:[
   ['操作确认','信息展示','明确操作对象、目标状态和不可逆影响。','P0','动态生成文案'],
   ['操作确认','确认执行','确认后关闭弹窗并执行一次业务回调。','P0','防重复点击'],
   ['操作确认','取消恢复','取消、遮罩或 Escape 关闭时不改变业务数据。','P0','恢复原焦点']
  ],
  flow:'业务动作触发确认层；用户核对信息后确认或取消。确认时先锁定按钮并执行校验，再提交操作；取消类关闭直接返回原界面。',
  exceptions:'对象已变化、重复提交或回调失败时保留原状态并提示；确认按钮执行期间不得再次触发。',
  data:'记录 confirmation_open、confirmation_confirm、confirmation_cancel；【假设】公共属性包含 action、object_type、object_id、close_method、result、timestamp。',
  risks:'前端确认不能替代服务端状态与权限校验；不可逆操作应保留审计记录。',
  acceptance:'所有关键操作显示准确文案；确认只执行一次；按钮、遮罩和 Escape 取消均不改变数据；失败时给出明确反馈。'
 },
 generic:{
  users:'当前页面的授权业务用户，以及产品、设计、研发和测试人员。',
  inScope:'当前页面展示字段、业务操作、状态、异常处理和可访问的 PRD 入口。',
  outScope:'后端接口实现、数据库持久化、组织外数据和未在当前原型展示的扩展能力。',
  features:[
   ['页面能力','字段展示','按当前字段口径展示数据并处理空值。','P0','教育局与学校按权限隔离'],
   ['页面能力','业务操作','仅在满足状态和权限时展示并执行操作。','P0','服务端须复核'],
   ['PRD 文档','查看与关闭','prd 入口打开当前页面文档；关闭后不改变业务状态。','P1','支持按钮、遮罩和 Escape']
  ],
  flow:'进入页面后加载有权访问的数据，按当前状态展示字段和操作；用户完成操作后刷新相关区域，返回时保持必要上下文。',
  exceptions:'无权限、数据不存在、已删除或输入非法时展示明确反馈，并阻止状态变更。',
  data:'字段来源以页面字段表为准。记录 page_open、page_action、page_error、prd_rule_open、prd_rule_close；【假设】公共属性包含 portal、device、page_key、object_id、timestamp。',
  risks:'正式环境依赖组织权限、服务端校验和一致的错误码；原型数据不代表生产接口已实现。',
  acceptance:'字段、状态、操作和异常规则与当前页面一致；越权入口不可用；PRD 关闭后页面内容与输入状态保持不变。'
 }
};

const PRD_V16_PROFILE_KEYS={
 page:{
  list:'management','list-response':'response','list-fill':'response','list-template-select':'templates','all-surveys':'directory','all-surveys-detail':'directory','all-surveys-response':'responseDetail',
  'create-basic':'basic','create-editor':'editor','create-publish':'collection','templates-survey':'templates','template-basic':'basic','template-editor':'editor',
  'survey-types':'types',auth:'auth',approval:'approval',stats:'stats','stats-detail':'stats','stats-save-folder':'resource','stats-people':'stats',
  'mobile-fill-list':'mobileList','mobile-form':'response','mobile-complete':'response','mobile-templates':'templates','mobile-create':'editor','mobile-settings':'collection'
 },
 overlay:{
  'question-picker':'editor','survey-type':'types',confirmation:'confirmation',qr:'qr','qr-preview':'response','stats-actions':'statsActions','resource-picker':'resource','save-progress':'resource','settings-choice':'collection','asset-preview':'assetPreview','template-type-picker':'templates'
 }
};

function prdV16Profile(key,entryType){return PRD_V16_PROFILES[PRD_V16_PROFILE_KEYS[entryType]?.[key]]||PRD_V16_PROFILES.generic}
function renderPrdV16Document(rule,key,entryType){
 const profile=prdV16Profile(key,entryType),features=prdTable(['功能模块','功能点','需求描述','优先级（P0 / P1 / P2）','备注说明'],profile.features),fields=prdTable(['字段/信息','限制与展示规则','当前原型来源'],rule.fields||[],'prd-field-table');
 return `<article class="prd-document" data-prd-version="${PRD_CURRENT_VERSION}"><header class="prd-document-head"><div><small>${entryType==='page'?'页面':'弹窗'}规则 · ${esc(key)}</small><h2>${esc(rule.title)}</h2></div><button type="button" class="prd-close" aria-label="关闭 PRD 规则">×</button></header><div class="prd-version-note">PRD ${PRD_CURRENT_VERSION} · 更新日期 ${PRD_CURRENT_DATE}</div><section><h3>1. 背景与目标</h3><p>${esc(rule.goal)}</p></section><section><h3>2. 用户与使用场景</h3><p>${profile.users}</p></section><section><h3>3. 需求范围</h3><h4>In Scope</h4><p>${profile.inScope}</p><h4>Out of Scope</h4><p>${profile.outScope}</p></section><section><h3>4. 功能需求列表</h3>${features}</section><section><h3>5. 核心流程与交互说明</h3><p>${profile.flow}</p>${fields}</section><section><h3>6. 异常场景与边界条件</h3><p>${profile.exceptions}</p></section><section><h3>7. 数据口径与埋点需求</h3><p>${profile.data}</p><p>PRD 入口记录 prd_entry_expose、prd_rule_open、prd_rule_close，公共属性包含 portal、device、page_key、overlay_key、entry_type、close_method 和 timestamp。</p></section><section><h3>8. 风险、依赖与限制</h3><p>${profile.risks}</p></section><section><h3>9. 验收标准</h3><p>${profile.acceptance}</p></section></article>`
}
function stampPrdVersion(html){let output=html.replace(/V1\.8 选择与计数口径/g,'V1.9 选择与计数口径');if(!output.includes('data-prd-version='))output=output.replace(/<article class="([^"]*\bprd-document\b[^"]*)">/,`<article class="$1" data-prd-version="${PRD_CURRENT_VERSION}">`);if(!output.includes('prd-version-note'))output=output.replace('</header>',`</header><div class="prd-version-note">PRD ${PRD_CURRENT_VERSION} · 更新日期 ${PRD_CURRENT_DATE}</div>`);return output}
const prdV16BaseRenderPrdDocument=renderPrdDocument;
renderPrdDocument=function(rule,key,entryType){
 const isCloud=entryType==='page'&&['cloud-widget','mobile-widget'].includes(key),isRecipient=(entryType==='page'&&['create-recipients','mobile-recipients'].includes(key))||(entryType==='overlay'&&key==='recipient-picker');
 return stampPrdVersion(isCloud||isRecipient?prdV16BaseRenderPrdDocument(rule,key,entryType):renderPrdV16Document(rule,key,entryType))
};

function installEditableDraftCoverage(){
 const sharedQuestions=portal=>cloneQuestions([
  {id:`${portal}-draft-name`,type:'填空',title:'请填写您的姓名',required:true,options:[]},
  {id:`${portal}-draft-focus`,type:'单选',title:'请选择本次调研的重点方向',required:true,options:['工作落实','资源保障','协同支持']},
  {id:`${portal}-draft-feedback`,type:'多选',title:'请选择需要进一步支持的事项',required:false,options:['政策解读','业务培训','资源协调']},
  {id:`${portal}-draft-date`,type:'日期',title:'请选择计划完成日期',required:false,options:[],includeTime:true}
 ]),bureau=CONFIG.bureau.surveys.find(s=>s.id===18),school=CONFIG.school.surveys.find(s=>s.id===20);
 if(bureau)Object.assign(bureau,{description:'用于收集新学期教育重点工作的推进安排与支持需求。',surveyTypeId:102,surveyTypeName:'行政管理',allowExternal:false,startDate:collectionDefaultDate(),endDate:collectionDefaultDate(7),frequency:'single',skipNonWorkday:false,dailyReminder:false,reminderTime:'',questions:sharedQuestions('bureau'),recipientSnapshot:[{id:'school-experiment',name:'临江县实验学校',count:126,category:'school',level:'group'}],target:'临江县实验学校',total:126,internalDone:0,externalDone:0,done:0});
 if(school)Object.assign(school,{description:'用于收集新学期班级管理安排、完成日期与协同支持需求。',surveyTypeId:201,surveyTypeName:'教学反馈',allowExternal:false,startDate:collectionDefaultDate(),endDate:collectionDefaultDate(7),frequency:'single',skipNonWorkday:false,dailyReminder:false,reminderTime:'',questions:sharedQuestions('school'),recipientSnapshot:[{id:'school-admin',name:'校办公室',count:3,category:'department',level:'group'}],target:'校办公室',total:3,internalDone:0,externalDone:0,done:0});
}
installEditableDraftCoverage();

document.addEventListener('DOMContentLoaded',mount);

/* V1.6 dynamic leaf-department recipient contract.
 * Embedded here so runtime behavior does not depend on an external compatibility file.
 * Workgroups, schools, parents and classes retain explicit/fixed selection semantics.
 */
(() => {
  'use strict';
  const uniq = values => [...new Set((values || []).filter(Boolean))];
  const personIdOf = value => value?.personId || value?.id || '';
  const active = person => person?.status === 'active' && person?.canReceive === true;
  const scopeKey = id => recipientScopeSelectionKey('department', id);
  const personKey = (category, id) => recipientSelectionKey(category, id);
  const clone = value => ({
    ...(value || {}),
    sourceCategories: [...(value?.sourceCategories || [])],
    sourceScopeIds: [...(value?.sourceScopeIds || [])],
    sourceDepartmentIds: [...(value?.sourceDepartmentIds || [])],
    sourceWorkgroupIds: [...(value?.sourceWorkgroupIds || [])],
    workgroupIds: [...(value?.workgroupIds || [])],
    workgroupNames: [...(value?.workgroupNames || [])],
    departments: (value?.departments || []).map(item => ({...item})),
    excludedChildIds: [...(value?.excludedChildIds || [])],
  });
  const department = id => (DEPARTMENT_PEOPLE[state.portal] || []).find(item => item.id === id) || null;
  const oldWorkgroupRule = item => {
    const category = item?.scopeType || item?.category;
    return category === 'workgroup' && item?.level === 'scope' &&
      ['dynamic', 'dynamic_department'].includes(item?.selectionMode);
  };

  recipientDeepClone = clone;
  isDynamicRecipientScope = item => Boolean(
    item && (item.scopeType || recipientItemCategory(item)) === 'department' &&
    item.level === 'scope' && ['dynamic', 'dynamic_department'].includes(item.selectionMode)
  );
  recipientScopeMembers = function (category, id) {
    if (category === 'department') {
      const value = department(id);
      return value?.isLeaf === true
        ? (value.children || []).filter(active).map(person => ({...person, id: person.personId, count: 1}))
        : [];
    }
    if (category === 'workgroup') {
      const value = recipientWorkgroupById(id);
      return value ? uniq(value.memberIds).map(recipientDirectoryPerson).filter(active) : [];
    }
    return [];
  };
  const scopeValue = id => {
    const value = department(id);
    const name = value?.name || id;
    return {id, scopeId: id, departmentId: id, name, scopeName: name, departmentNameSnapshot: name,
      category: 'department', level: 'scope', scopeType: 'department',
      selectionMode: 'dynamic_department', count: recipientScopeMembers('department', id).length};
  };
  recipientScopeIsInvalid = function (item) {
    if (!isDynamicRecipientScope(item)) return false;
    const id = recipientScopeId(item), value = department(id);
    return !value || value.deleted === true || value.deleted === 1 || value.status === 'deleted' ||
      value.authorized === false || value.canAccess === false || value.permissionDenied === true ||
      value.isLeaf !== true || recipientScopeMembers('department', id).length === 0;
  };

  normalizeRecipientMap = function (input) {
    const output = new Map();
    for (const [storedKey, raw] of input || []) {
      const item = clone(raw), category = item.scopeType || recipientItemCategory(item);
      const id = item.scopeId || item.departmentId || item.workgroupId || item.personId ||
        item.schoolId || item.id || String(storedKey).split(':').pop();
      if (category === 'department' && item.level === 'scope' &&
          ['dynamic', 'dynamic_department'].includes(item.selectionMode)) {
        const normalized = {...item, ...scopeValue(id)};
        normalized.requiresReselection = recipientScopeIsInvalid(normalized);
        output.set(scopeKey(id), normalized);
        continue;
      }
      if (oldWorkgroupRule(item)) {
        output.set(personKey('workgroup', `legacy-${id}`), {...item, id, category: 'workgroup',
          scopeType: 'workgroup', level: 'legacy_fixed_scope', selectionMode: 'legacy_fixed_scope',
          count: Math.max(0, Number(item.count || item.memberCount || 0)), legacyFixed: true});
        continue;
      }
      if (item.level === 'person' || item.personId) {
        const personId = personIdOf(item);
        if (!personId) continue;
        const categories = uniq(item.sourceCategories?.length ? item.sourceCategories : [recipientItemCategory(item)]);
        (categories.length ? categories : ['department']).forEach(rawCategory => {
          const personCategory = rawCategory === 'legacy' ? 'department' : rawCategory;
          const key = personKey(personCategory, personId), previous = output.get(key);
          const normalized = {...item, id: personId, personId, category: personCategory, level: 'person', count: 1,
            sourceScopeIds: uniq([...(previous?.sourceScopeIds || []), ...(item.sourceScopeIds || [])]),
            explicitSelection: Boolean(previous?.explicitSelection || item.explicitSelection)};
          output.set(key, previous ? {...previous, ...normalized} : normalized);
        });
        continue;
      }
      output.set(personKey(category, id), {...item, id, category});
    }
    return output;
  };
  recipientResolvedSelection = function (input, category = '') {
    const items = input instanceof Map ? [...input.values()] : Array.isArray(input) ? input : [];
    const people = new Map(), invalidScopes = [];
    let rangeTotal = 0;
    items.forEach(item => {
      const itemCategory = recipientItemCategory(item);
      if (category && itemCategory !== category) return;
      if (isDynamicRecipientScope(item)) {
        if (recipientScopeIsInvalid(item)) invalidScopes.push(item);
        else recipientScopeMembers('department', recipientScopeId(item)).forEach(person =>
          people.set(person.personId, {...person, id: person.personId}));
        return;
      }
      if (item.level === 'person' || item.personId) {
        const personId = personIdOf(item), frozen = item.frozen === true || item.selectionMode === 'snapshot';
        const current = frozen ? null : recipientDirectoryPerson(personId);
        if (!frozen && ['department', 'workgroup'].includes(itemCategory) && !active(current)) return;
        people.set(personId, {...item, ...(current || {}), id: personId, personId});
        return;
      }
      rangeTotal += Math.max(0, Number(item.staffCount ?? item.count ?? 0));
    });
    return {people, personIds: new Set(people.keys()), rangeTotal, total: people.size + rangeTotal, invalidScopes};
  };
  recipientSelectionContract = function (store = state.recipients) {
    const recipientRules = [], explicitPersonIds = [];
    for (const item of store?.values?.() || []) {
      if (isDynamicRecipientScope(item) && !recipientScopeIsInvalid(item)) {
        const id = recipientScopeId(item);
        recipientRules.push({selectionMode: 'dynamic_department', departmentId: id,
          departmentNameSnapshot: department(id)?.name || item.departmentNameSnapshot || item.name || id});
      } else if (item.level === 'person' || item.personId) {
        const personId = personIdOf(item);
        if (personId && !explicitPersonIds.includes(personId)) explicitPersonIds.push(personId);
      }
    }
    return {recipientRules, explicitPersonIds};
  };
  refreshRecipientContractState = function () {
    const contract = recipientSelectionContract();
    state.recipientRules = contract.recipientRules;
    state.explicitPersonIds = contract.explicitPersonIds;
    return contract;
  };

  const sourceIds = item => uniq(item?.sourceScopeIds);
  const selectedInDepartment = (personId, departmentId, store = state.recipientPickerDraft || state.recipients) => {
    if (store?.has(scopeKey(departmentId))) return true;
    const item = store?.get(personKey('department', personId));
    return Boolean(item && (sourceIds(item).includes(departmentId) || (item.explicitSelection && !sourceIds(item).length)));
  };
  const addSource = (person, departmentId) => {
    const id = personIdOf(person), key = personKey('department', id), existing = state.recipientPickerDraft.get(key);
    const item = existing ? clone(existing) : {...person, id, personId: id, category: 'department',
      level: 'person', count: 1, status: 'active', explicitSelection: false, sourceScopeIds: []};
    item.sourceScopeIds = uniq([...item.sourceScopeIds, departmentId]);
    state.recipientPickerDraft.set(key, item);
  };
  const removeSource = (personId, departmentId) => {
    const key = personKey('department', personId), current = state.recipientPickerDraft.get(key);
    if (!current) return;
    const item = clone(current);
    item.sourceScopeIds = sourceIds(item).filter(id => id !== departmentId);
    if (!item.sourceScopeIds.length && !item.explicitSelection) state.recipientPickerDraft.delete(key);
    else state.recipientPickerDraft.set(key, item);
  };
  const splitScope = (departmentId, excludedId = '') => {
    if (!state.recipientPickerDraft?.has(scopeKey(departmentId))) return;
    state.recipientPickerDraft.delete(scopeKey(departmentId));
    recipientScopeMembers('department', departmentId).forEach(person => {
      if (person.personId !== excludedId) addSource(person, departmentId);
    });
    recipientTrack('recipient_scope_convert_to_people', {category: 'department', scope_type: 'department',
      scope_id: departmentId, person_id: excludedId, selection_mode: 'explicit_people',
      module_selected_count: recipientCategoryCount('department', state.recipientPickerDraft)});
  };
  const promoteComplete = () => {
    if (!(state.recipientPickerDraft instanceof Map)) return;
    (DEPARTMENT_PEOPLE[state.portal] || []).filter(item => item.isLeaf === true).forEach(value => {
      const members = recipientScopeMembers('department', value.id);
      if (!members.length || state.recipientPickerDraft.has(scopeKey(value.id)) ||
          !members.every(person => selectedInDepartment(person.personId, value.id))) return;
      state.recipientPickerDraft.set(scopeKey(value.id), scopeValue(value.id));
      members.forEach(person => removeSource(person.personId, value.id));
    });
  };
  setDraftDynamicScope = function (category, id, checked) {
    if (!(state.recipientPickerDraft instanceof Map)) return;
    if (category === 'workgroup') {
      const members = recipientScopeMembers('workgroup', id);
      members.forEach(person => setDraftPerson('workgroup', person, checked, id));
      recipientTrack(checked ? 'recipient_person_select_all' : 'recipient_person_unselect_all', {
        category: 'workgroup', workgroup_id: id, selection_mode: 'explicit_people',
        module_selected_count: recipientCategoryCount('workgroup', state.recipientPickerDraft)
      });
      return;
    }
    if (category !== 'department') return;
    const value = department(id), members = recipientScopeMembers('department', id);
    if (!value || value.isLeaf !== true || !members.length) return;
    if (checked) {
      state.recipientPickerDraft.set(scopeKey(id), scopeValue(id));
      members.forEach(person => removeSource(person.personId, id));
    } else splitScope(id);
    recipientTrack(checked ? 'recipient_scope_select' : 'recipient_scope_unselect', {category: 'department',
      scope_type: 'department', scope_id: id, selection_mode: checked ? 'dynamic_department' : 'explicit_people',
      resolved_person_count: members.length,
      module_selected_count: recipientCategoryCount('department', state.recipientPickerDraft)});
  };
  removeDraftPersonEverywhere = function (category, personId) {
    if (!(state.recipientPickerDraft instanceof Map)) return;
    if (category === 'department') {
      [...state.recipientPickerDraft.values()].filter(item => isDynamicRecipientScope(item) &&
        recipientScopeMembers('department', recipientScopeId(item)).some(person => person.personId === personId))
        .forEach(item => splitScope(recipientScopeId(item), personId));
    }
    state.recipientPickerDraft.delete(personKey(category, personId));
  };
  setDraftPerson = function (category, person, checked, id = '') {
    if (!(state.recipientPickerDraft instanceof Map)) return;
    const personId = personIdOf(person);
    if (!personId) return;
    if (category === 'department') {
      if (checked) {
        if (!recipientScopeMembers('department', id).some(item => item.personId === personId)) return;
        addSource(person, id);
        promoteComplete();
      } else if (id) {
        if (state.recipientPickerDraft.has(scopeKey(id))) splitScope(id, personId);
        else removeSource(personId, id);
      } else removeDraftPersonEverywhere(category, personId);
    } else {
      const key = personKey(category, personId);
      if (checked) {
        const current = state.recipientPickerDraft.get(key);
        const item = current ? clone(current) : recipientPersonValue(category, person, id);
        item.sourceScopeIds = uniq([...(item.sourceScopeIds || []), id]);
        item.explicitSelection = !id;
        state.recipientPickerDraft.set(key, item);
      } else if (!id) state.recipientPickerDraft.delete(key);
      else {
        const current = state.recipientPickerDraft.get(key);
        if (current) {
          const item = clone(current);
          item.sourceScopeIds = sourceIds(item).filter(value => value !== id);
          if (!item.sourceScopeIds.length && !item.explicitSelection) state.recipientPickerDraft.delete(key);
          else state.recipientPickerDraft.set(key, item);
        }
      }
    }
    recipientTrack(checked ? 'recipient_person_select' : 'recipient_person_unselect', {category, person_id: personId,
      department_id: category === 'department' ? id : '', workgroup_id: category === 'workgroup' ? id : '',
      selection_mode: 'explicit_people', module_selected_count: recipientCategoryCount(category, state.recipientPickerDraft)});
  };
  recipientPersonSelectedInScope = function (category, personId, id, store = state.recipientPickerDraft || state.recipients) {
    if (category === 'department') return selectedInDepartment(personId, id, store);
    const item = store?.get(personKey(category, personId));
    return Boolean(item && (sourceIds(item).includes(id) || (item.explicitSelection && !sourceIds(item).length)));
  };
  recipientPersonCovered = (category, personId, store = state.recipientPickerDraft || state.recipients) =>
    recipientResolvedSelection(store, category).personIds.has(personId);
  recipientPersonPickerState = function (category, personId, id, store = state.recipientPickerDraft || state.recipients) {
    const checked = recipientPersonSelectedInScope(category, personId, id, store);
    const coveredAnywhere = recipientResolvedSelection(store).personIds.has(personId);
    return {checked, coveredByOther: !checked && coveredAnywhere};
  };
   recipientScopeState = function (category, id, store = state.recipientPickerDraft || state.recipients) {
     const members = recipientScopeMembers(category, id);
     const selected = members.filter(person => recipientPersonSelectedInScope(category, person.personId, id, store)).length;
     const checked = category === 'department'
       ? Boolean(store?.has(scopeKey(id)))
       : Boolean(members.length) && selected === members.length;
     return {checked, indeterminate: !checked && selected > 0, selected, members};
   };
  recipientCategoryCount = (category, store = state.recipients) => recipientResolvedSelection(store, category).total;
  recipientCount = () => recipientResolvedSelection(state.recipients).total;

  selectedRecipientSnapshot = function () {
    const scopes = [], people = new Map(), ranges = [], snapshotAt = formatSystemTime();
    usableRecipientItems().forEach(item => {
      const category = recipientItemCategory(item);
      if (isDynamicRecipientScope(item)) scopes.push({...scopeValue(recipientScopeId(item)), snapshotAt});
      else if (item.level === 'person' || item.personId) {
        const id = personIdOf(item), current = recipientDirectoryPerson(id);
        if (!current && item.selectionMode !== 'snapshot' && !item.frozen) return;
        const previous = people.get(id) || {id, personId: id, name: current?.name || item.name || id, count: 1,
          level: 'person', status: current?.status || item.status || 'active', selectionMode: 'explicit_person',
          snapshotAt, sourceCategories: [], departments: [], workgroupIds: [], workgroupNames: []};
        previous.sourceCategories = uniq([...previous.sourceCategories, category]);
        const affiliations = recipientPersonAffiliations(id);
        previous.departments = [...new Map([...previous.departments, ...affiliations]
          .filter(value => value.departmentId).map(value => [value.departmentId, value])).values()];
        if (category === 'workgroup') {
          const ids = uniq([...(item.workgroupIds || []), ...(item.sourceScopeIds || [])]);
          ids.forEach((workgroupId, index) => {
            if (!previous.workgroupIds.includes(workgroupId)) {
              previous.workgroupIds.push(workgroupId);
              previous.workgroupNames.push(item.workgroupNames?.[index] || recipientWorkgroupById(workgroupId)?.name || workgroupId);
            }
          });
        }
        people.set(id, previous);
      } else ranges.push(clone(item));
    });
    return [...scopes, ...people.values(), ...ranges];
  };
  const surveyItem = item => {
    if (oldWorkgroupRule(item)) return {...clone(item), category: 'workgroup', scopeType: 'workgroup',
      level: 'legacy_fixed_scope', selectionMode: 'legacy_fixed_scope',
      count: Math.max(0, Number(item.count || item.memberCount || 0)), legacyFixed: true};
    if (item?.level === 'person' || item?.personId) return {...clone(item),
      selectionMode: item.selectionMode || 'snapshot', frozen: item.frozen !== false};
    return clone(item);
  };
  surveyRecipientItems = function (survey) {
    const rules = (survey?.recipientRules || []).filter(rule =>
      rule.selectionMode === 'dynamic_department' && rule.departmentId).map(rule => ({...scopeValue(rule.departmentId),
        name: rule.departmentNameSnapshot || department(rule.departmentId)?.name || rule.departmentId,
        departmentNameSnapshot: rule.departmentNameSnapshot || department(rule.departmentId)?.name || rule.departmentId}));
    const explicit = uniq(survey?.explicitPersonIds).map(id => {
      const current = recipientDirectoryPerson(id);
      return {...(current || {}), id, personId: id, name: current?.name || id, category: 'department',
        level: 'person', selectionMode: 'explicit_person', frozen: false};
    });
    if (rules.length || explicit.length || Number(survey?.recipientSelectionSchemaVersion) >= 3) {
      const ranges = (survey?.recipientSnapshot || []).filter(item =>
        !(item?.level === 'person' || item?.personId) && !isDynamicRecipientScope(item));
      return [...rules, ...explicit, ...ranges.map(surveyItem)];
    }
    return (survey?.recipientSnapshot || []).map(surveyItem);
  };
  surveyHasDynamicRecipientScopes = survey => surveyRecipientItems(survey).some(isDynamicRecipientScope);
  surveyHasResolvedRecipientObjects = survey => surveyRecipientItems(survey).some(item =>
    isDynamicRecipientScope(item) || item.level === 'person' || item.personId);
  surveyRecipientResolution = survey => recipientResolvedSelection(surveyRecipientItems(survey));
  surveyKnownInternalAnswerRecords = function (survey, date = '') {
    const records = [...responseRecords(survey).filter(record => !record.external),
      ...(Array.isArray(survey?.internalResponseRecords) ? survey.internalResponseRecords : []),
      ...(Array.isArray(survey?.respondentRecords) ? survey.respondentRecords : [])]
      .filter(record => record && record.valid !== false && (!date || String(record.submittedAt || '').slice(0, 10) === date));
    const seen = new Set();
    return records.filter((record, index) => {
      const key = record.id || `${record.personId || 'anonymous'}:${record.submittedAt || ''}:${index}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).sort((a, b) => String(b.submittedAt || '').localeCompare(String(a.submittedAt || '')));
  };
  currentPersonResponseRecords = survey => {
    const id = currentRecipientPersonId();
    return responseRecords(survey).filter(record => !record.external && Boolean(record.personId) && record.personId === id);
  };
  recipientAssignmentDate = (survey, date = beijingDateKey()) => isDailySurvey(survey) ? date : null;
  const progress = (survey, id, row, submitted) => {
    if (submitted.has(id) || row?.progressStatus === 'submitted') return 'submitted';
    return 'pending';
  };
  syncSurveyRecipientAssignments = function (survey, date = beijingDateKey()) {
    if (!survey || !surveyHasResolvedRecipientObjects(survey)) return survey?.recipientAssignments || [];
    syncSurveyTemporalStatus(survey);
    const collectionDate = recipientAssignmentDate(survey, date), all = survey.recipientAssignments || (survey.recipientAssignments = []);
    const rows = all.filter(row => (row.collectionDate || null) === collectionDate);
    if (survey.status !== 'running' || (collectionDate && collectionDate !== beijingDateKey())) return rows;
    const resolution = surveyRecipientResolution(survey), responses = surveyKnownInternalAnswerRecords(survey, collectionDate || '');
    const submitted = new Set(responses.map(record => record.personId).filter(Boolean));
    if (!collectionDate) (survey.respondentPersonIds || []).filter(Boolean).forEach(id => submitted.add(id));
    const byId = new Map(rows.map(row => [row.personId, row])), rules = surveyRecipientItems(survey).filter(isDynamicRecipientScope);
    resolution.people.forEach((person, id) => {
      let row = byId.get(id);
      if (!row) {
        row = {surveyId: survey.id, personId: id, collectionDate, assignedAt: formatSystemTime()};
        all.push(row);
        byId.set(id, row);
      }
      Object.assign(row, {surveyId: survey.id, personId: id, collectionDate, eligibleNow: true,
        progressStatus: progress(survey, id, row, submitted),
        sourceDepartmentIds: uniq(rules.filter(rule => recipientScopeMembers('department', recipientScopeId(rule))
          .some(personValue => personValue.personId === id)).map(recipientScopeId)), assignedAt: row.assignedAt || formatSystemTime()});
    });
    byId.forEach((row, id) => {
      if (!resolution.personIds.has(id)) {
        row.eligibleNow = false;
        row.progressStatus = progress(survey, id, row, submitted);
      }
    });
    submitted.forEach(id => {
      if (byId.has(id)) return;
      const answer = responses.find(record => record.personId === id);
      const row = {surveyId: survey.id, personId: id, collectionDate, eligibleNow: false,
        progressStatus: 'submitted', sourceDepartmentIds: [], assignedAt: answer?.submittedAt || formatSystemTime()};
      all.push(row);
      byId.set(id, row);
    });
    return [...byId.values()];
  };
  recipientAssignmentTotal = function (survey, date = beijingDateKey(), reportedValue = null) {
    const resolution = surveyRecipientResolution(survey), collectionDate = recipientAssignmentDate(survey, date);
    const rows = syncSurveyRecipientAssignments(survey, date);
    const counted = new Set(rows.filter(row => row.eligibleNow || row.progressStatus === 'submitted').map(row => row.personId).filter(Boolean));
    const records = surveyKnownInternalAnswerRecords(survey, collectionDate || ''), known = new Set(records.map(record => record.personId).filter(Boolean));
    let reported;
    if (reportedValue != null) reported = Number(reportedValue || 0);
    else if (collectionDate) reported = Number(generatedDailyStats(survey)?.[collectionDate]?.internalDone || 0);
    else reported = internalSubmittedCount(survey);
    const anonymous = Math.max(0, reported - known.size);
    if (rows.length) return Math.max(counted.size + resolution.rangeTotal + anonymous, reported);
    if (['paused', 'ended'].includes(survey?.status)) {
      const frozen = collectionDate ? generatedDailyStats(survey)?.[collectionDate]?.total : survey.total;
      return Math.max(Number(frozen || 0), reported);
    }
    return Math.max(resolution.personIds.size + resolution.rangeTotal, reported);
  };
  syncDynamicSurveyRecipientTotal = function (survey) {
    if (!surveyHasResolvedRecipientObjects(survey)) return Number(survey?.total || 0);
    survey.total = recipientAssignmentTotal(survey);
    survey.recipientCountMode = surveyHasDynamicRecipientScopes(survey) ? 'dynamic_department' : 'resolved_people';
    return survey.total;
  };
  surveyAllowsCurrentPerson = function (survey) {
    if (!survey) return false;
    syncSurveyTemporalStatus(survey);
    const items = surveyRecipientItems(survey);
    if (!items.some(item => isDynamicRecipientScope(item) || item.level === 'person' || item.personId)) return survey.received === true;
    const id = currentRecipientPersonId();
    if (!id) return false;
    if (survey.status === 'running') return syncSurveyRecipientAssignments(survey).some(row => row.personId === id && row.eligibleNow);
    return (survey.recipientAssignments || []).some(row => row.personId === id && (row.eligibleNow || row.progressStatus === 'submitted'));
  };
  canCreateResponse = function (survey) {
    syncSurveyTemporalStatus(survey);
    if (!survey || survey.status !== 'running') return false;
    const path = String(location?.pathname || '');
    const external = isExternalFillContext(survey) || state.page === `mobile/fill/${survey.id}/external` ||
      path === `/external/survey/${survey.id}` || path.endsWith(`/external/survey/${survey.id}`);
    if (external ? !(survey.allowExternal || survey.channel === 'public') : !surveyAllowsCurrentPerson(survey)) return false;
    const records = external ? responseRecords(survey).filter(record => record.external) : currentPersonResponseRecords(survey);
    if (!records.length) return true;
    return survey.frequency === 'daily' && !records.some(record => String(record.submittedAt || '').slice(0, 10) === beijingDateKey());
  };
  isReceivedSurveyVisible = function (survey) {
    if (!survey || survey.deleted === 1) return false;
    syncSurveyTemporalStatus(survey);
    return RECEIVED_VISIBLE_STATUSES.has(survey.status) &&
      (surveyAllowsCurrentPerson(survey) || currentPersonResponseRecords(survey).length > 0);
  };

  const baseDepartmentPickerMarkup = departmentPickerMarkup;
  departmentPickerMarkup = function (mobile = false) {
    const markup = baseDepartmentPickerMarkup(mobile);
    if (mobile || markup.includes('recipient-result-select-all')) return markup;
    const people = departmentFilteredPeople();
    const selected = people.filter(person => recipientPersonCovered('department', person.personId, state.recipientPickerDraft)).length;
    const control = `<label class="recipient-result-select-all"><input type="checkbox" data-picker-department-all ${people.length && selected === people.length ? 'checked' : ''} ${people.length ? '' : 'disabled'}><span>全选当前结果</span></label>`;
    return markup.replace('</div><div class="recipient-table-head', `${control}</div><div class="recipient-table-head`);
  };
  const baseBindRecipientPickerControls = bindRecipientPickerControls;
  bindRecipientPickerControls = function (root = $('#view')) {
    baseBindRecipientPickerControls(root);
    const all = $('[data-picker-department-all]', root);
    if (!all || state.recipientPickerCategory !== 'department') return;
    const people = departmentFilteredPeople();
    const selected = people.filter(person => recipientPersonCovered('department', person.personId, state.recipientPickerDraft)).length;
    all.checked = Boolean(people.length) && selected === people.length;
    all.indeterminate = selected > 0 && selected < people.length;
    all.setAttribute('aria-checked', all.indeterminate ? 'mixed' : String(all.checked));
    all.onchange = () => {
      people.forEach(person => all.checked ? setDraftPerson('department', person, true, person.departmentId) :
        removeDraftPersonEverywhere('department', person.personId));
      recipientTrack(all.checked ? 'recipient_person_select_all' : 'recipient_person_unselect_all', {category: 'department',
        search_keyword: state.recipientPickerSearch, module_selected_count: recipientCategoryCount('department', state.recipientPickerDraft)});
      rerenderRecipientPicker();
    };
  };

  const baseDraftPayload = draftPayload, baseTemplateValue = surveyTemplateValue, baseDraftSnapshot = draftRecipientSnapshot;
  draftPayload = function (existing = null) {
    const value = baseDraftPayload(existing), contract = recipientSelectionContract();
    return {...value, recipientSelectionSchemaVersion: 3, ...contract, recipientSnapshot: selectedRecipientSnapshot(),
      recipientAssignments: (existing?.recipientAssignments || []).map(row =>
        ({...row, sourceDepartmentIds: [...(row.sourceDepartmentIds || [])]}))};
  };
  surveyTemplateValue = function (existing) { return surveyTemplateContentValue(existing); };
  draftRecipientSnapshot = source => source?.recipientRules?.length || source?.explicitPersonIds?.length ||
    Number(source?.recipientSelectionSchemaVersion) >= 3 ? surveyRecipientItems(source) : baseDraftSnapshot(source);
  recipientSelectionError = function () {
    const items = [...state.recipients.values()];
    if (items.find(item => isDynamicRecipientScope(item) && recipientScopeIsInvalid(item))) return '已选部门范围已失效，请重新选择';
    if (items.some(item => item.requiresReselection && !isDynamicRecipientScope(item))) return '历史接收范围已失效，请重新选择';
    const count = recipientCount();
    if (state.portal === 'school' && !count && !state.externalRecipient) return '内部部门、家长、班级至少选择一项，或开启外部填写';
    if (!count && !state.externalRecipient) return '请选择有效接收人员或开启外部填写';
    return '';
  };
  state.recipients = normalizeRecipientMap(state.recipients);
  refreshRecipientContractState();
  if (document.documentElement?.dataset) document.documentElement.dataset.recipientDynamicDepartmentV16 = 'ready';
})();

function restoreRecipientV16ApprovedContract(){
 const contract=RECIPIENT_V16_APPROVED_CONTRACT,cloneRows=rows=>(rows||[]).map(row=>[...row]),strictDirectoryPerson=contract.recipientDirectoryPerson,strictScopeMembers=contract.recipientScopeMembers;
 recipientDeepClone=contract.recipientDeepClone;
 isDynamicRecipientScope=contract.isDynamicRecipientScope;
 recipientDirectoryPerson=function(personId){const person=strictDirectoryPerson(personId);return person?.status==='active'&&person?.canReceive===true?person:null};
 recipientScopeMembers=function(category,scopeId){return strictScopeMembers(category,scopeId).filter(person=>person?.status==='active'&&person?.canReceive===true)};
 recipientScopeIsInvalid=function(item){
  if(!isDynamicRecipientScope(item))return false;
  const category=item.scopeType||recipientItemCategory(item),scopeId=recipientScopeId(item),definition=recipientScopeDefinition(category,scopeId),inaccessible=definition&&(definition.deleted===true||definition.deleted===1||definition.status==='deleted'||definition.authorized===false||definition.canAccess===false||definition.permissionDenied===true);
  return !definition||inaccessible||(category==='department'&&!definition.isLeaf)||!recipientScopeMembers(category,scopeId).length;
 };
 normalizeRecipientMap=contract.normalizeRecipientMap;
 recipientResolvedSelection=contract.recipientResolvedSelection;
 recipientSelectionContract=contract.recipientSelectionContract;
 setDraftDynamicScope=contract.setDraftDynamicScope;
 setDraftPerson=contract.setDraftPerson;
 recipientPersonSelectedInScope=contract.recipientPersonSelectedInScope;
 recipientPersonCovered=contract.recipientPersonCovered;
 recipientPersonPickerState=contract.recipientPersonPickerState;
 recipientScopeState=contract.recipientScopeState;
 recipientCategoryCount=contract.recipientCategoryCount;
 recipientCount=contract.recipientCount;
 selectedRecipientSnapshot=contract.selectedRecipientSnapshot;
 bindRecipientPickerControls=contract.bindRecipientPickerControls;
 draftPayload=contract.draftPayload;
 surveyTemplateValue=surveyTemplateContentValue;
 draftRecipientSnapshot=contract.draftRecipientSnapshot;
 recipientSelectionError=contract.recipientSelectionError;
 loadEditableSurveyState=contract.loadEditableSurveyState;
 surveyRecipientItems=contract.surveyRecipientItems;
 recipientAssignmentTotal=contract.recipientAssignmentTotal;
 statsSnapshot=contract.statsSnapshot;
 statsPeopleData=contract.statsPeopleData;
 surveyRecipientResolution=contract.surveyRecipientResolution;
 surveyAllowsCurrentPerson=contract.surveyAllowsCurrentPerson;
 canCreateResponse=contract.canCreateResponse;
 renderRecipientPickerPrd=contract.renderRecipientPickerPrd;
 PRD_FIELD_GROUPS.recipients=cloneRows(contract.recipientFields);
 PRD_FIELD_GROUPS.recipientPicker=cloneRows(contract.pickerFields);
 Object.entries(contract.pageRules).forEach(([key,value])=>{if(PRD_PAGE_RULES[key]){PRD_PAGE_RULES[key].goal=value.goal;PRD_PAGE_RULES[key].fields=cloneRows(value.fields)}});
 PRD_OVERLAY_RULES['recipient-picker']={...contract.overlayRule,fields:cloneRows(contract.overlayRule.fields)};
 if(document.documentElement?.dataset){delete document.documentElement.dataset.recipientDynamicDepartmentV16;document.documentElement.dataset.recipientScopeContract='v16-frozen-snapshot'}
}
restoreRecipientV16ApprovedContract();
document.addEventListener('DOMContentLoaded',restoreRecipientV16ApprovedContract);
function handleResponseAction(a,b){if(a==='select-my-response'){state.responseSelection[+b.dataset.surveyId]=b.dataset.responseId;renderShell();return true}if(a!=='submit-my-response')return false;if(b.dataset.responseId){toast('已提交答卷不支持修改');return true}const s=CONFIG[state.portal].surveys.find(x=>x.id===+b.dataset.surveyId);syncSurveyTemporalStatus(s);if(s.status!=='running'){toast(s.status==='not_started'?'问卷尚未开始':'当前问卷不可提交');return true}const answers=collectSurveyAnswers(s),answerError=responseAnswerError(s,answers);if(answerError){toast(answerError);return true}const records=MY_RESPONSES[state.portal][s.id]||(MY_RESPONSES[state.portal][s.id]=[]),personId=currentRecipientPersonId();if(!canCreateResponse(s)){toast(!surveyAllowsCurrentPerson(s)?'您当前已不在问卷接收范围内':'当前提交频次不允许再次提交，已提交答卷不支持修改');return true}const record={id:`${state.portal==='bureau'?'B':'S'}${s.id}-${Date.now()}`,surveyId:s.id,personId,submitter:currentUserName(),submittedAt:responseTimestamp(),valid:true,answers};records.push(record);s.fillStatus='submitted';if(s.internalDone!==undefined){s.internalDone+=1;s.done=submittedCount(s)}else s.done=(s.done||0)+1;syncDynamicSurveyRecipientTotal(s);state.responseSelection[s.id]=record.id;location.hash=`list/response/${s.id}`;toast('问卷提交成功');return true}

/* Template content is intentionally independent from recipient compatibility releases.
 * Re-apply after external scripts finish because those releases also support older pages. */
function restoreTemplateContentOnlyContract(retireCompatibilityPrd=false){
 surveyTemplateValue=surveyTemplateContentValue;
 loadSurveyTemplateState=loadSurveyTemplateContentState;
 if(retireCompatibilityPrd)delete PRD_PAGE_RULES[RETIRED_TEMPLATE_RECIPIENT_PRD_KEY];
 if(document.documentElement?.dataset)document.documentElement.dataset.templateWorkflow='content-only-v2';
}
restoreTemplateContentOnlyContract(false);
if(typeof window!=='undefined'){
 window.addEventListener('DOMContentLoaded',()=>restoreTemplateContentOnlyContract(true));
 window.addEventListener('load',()=>{
  restoreTemplateContentOnlyContract(true);
  if(typeof window.setTimeout==='function')window.setTimeout(()=>restoreTemplateContentOnlyContract(true),0);
 });
 if(typeof window.setTimeout==='function')window.setTimeout(()=>restoreTemplateContentOnlyContract(true),0);
}
