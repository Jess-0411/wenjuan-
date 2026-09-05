# Design QA：部门 / 工作组范围回显 V1.6

## 检查范围

- 教育局 PC：`recipient-scope-bureau-pc.png`
- 学校 PC：`recipient-scope-school-pc.png`
- 教育局移动端：`recipient-scope-bureau-mobile.png`
- 学校移动端：`recipient-scope-school-mobile.png`
- 接收对象 PRD 弹窗：`recipient-scope-prd.png`
- PC 视口：1440 × 1000；移动预览视口：900 × 1180，设备画布保持既有手机框比例。

## 视觉检查

- PC 接收对象卡片内，完整部门和完整工作组仅显示范围名称标签，标签不展开人员姓名或人数。
- 移动端与 PC 使用同一标签规则；卡片右上角显示去重后的“已选择 N 人”，底部主操作文案为“确认”。
- 教育局端沿用蓝色主题，学校端沿用绿色主题；范围标签、删除入口和“添加人员”按钮层级清晰。
- PC 卡片、移动卡片、长页面底部操作区均无横向溢出、遮挡、异常换行或误触区域。
- PRD 弹窗可完整展示九章结构、固定五列表格和范围/人员/发布快照口径；弹窗背景遮罩与关闭入口正常。

## 交互与数据检查

- 完整部门、完整工作组、逐人选满自动归一化均回显范围名称。
- 部分选择回显具体人员；从完整范围取消一人只拆分当前范围，其他完整范围保持不变。
- 手动拆分状态优先；只有以当前范围来源补齐全部有效成员后才恢复范围名称。
- 重叠人员按 `personId` 去重；当前范围未选但被其他范围覆盖时显示“已由其他范围选中”。
- 删除范围标签只移除该范围来源；删除人员标签不影响其他完整范围覆盖。
- 草稿、模板保留 `recipientSelections` 和 `recipientManualPartialScopes`；发布时生成带同批次 `snapshotAt`、`selectionMode=snapshot`、`frozen=true` 的人员快照。
- 停用、`canReceive=false`、空范围、缺失和越权范围均不形成有效完整范围；失效范围阻止发布。

## 自动化与浏览器证据

- `node --check app.js`：通过。
- `node --check recipient-scope-v16.final.js`：通过。
- `node --check qa_recipient_scope.cjs`：通过。
- `node qa_recipient_scope.cjs`：16 / 16 组通过；同时在当前工作副本与线上基线 `HEAD app.js` 两种组合下执行。
- `node capture_recipient_scope.cjs`：四端截图与 PRD 弹窗截图生成通过，浏览器控制台无错误。
- `git diff --check`：通过。

## 并发冲突处理

- 检查时识别到旧的 `recipient-picker-explicit-v2.js/.css` 会在最后执行并恢复 person-only 规则。
- 最终线上 HTML 不加载上述旧覆盖文件，只按 `app.js → recipient-scope-v16.final.js` 顺序执行，并在基础样式后加载 `recipient-scope-v16.final.css`；缓存版本固定为 `20260905-recipient-scope-v16`。
- `recipient-picker-v2.js` 与旧显式人员覆盖文件均不属于本次页面运行依赖。

## 结论

- P0：0
- P1：0
- P2：0
- 最终结果：passed
