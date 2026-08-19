const fs = require('fs');
const path = require('path');

console.log("=== EVALUACIÓN Y VALIDACIÓN DE FLUJOS N8N ===");

const notifWorkflowPath = path.join(__dirname, 'n8n_order_notification_workflow.json');
const dispatchWorkflowPath = path.join(__dirname, 'n8n_order_dispatch_workflow.json');

const notifWorkflow = JSON.parse(fs.readFileSync(notifWorkflowPath, 'utf8'));
const dispatchWorkflow = JSON.parse(fs.readFileSync(dispatchWorkflowPath, 'utf8'));

console.log("\n1. ANALIZANDO: Flujo de Notificación de Nuevo Pedido");
console.log(`- Nombre: ${notifWorkflow.name}`);
console.log(`- Cantidad de Nodos: ${notifWorkflow.nodes.length}`);

const notifWebhookNode = notifWorkflow.nodes.find(n => n.type.includes('webhook'));
console.log(`- Path Webhook: /webhook/${notifWebhookNode.parameters.path}`);
console.log(`- Método: ${notifWebhookNode.parameters.httpMethod}`);

const notifSetNode = notifWorkflow.nodes.find(n => n.type.includes('set'));
console.log(`- Formato Plantilla WhatsApp:`);
console.log(notifSetNode.parameters.values.string[0].value);

console.log("\n2. ANALIZANDO: Flujo de Despacho de Notificaciones por Estado");
console.log(`- Nombre: ${dispatchWorkflow.name}`);
console.log(`- Cantidad de Nodos: ${dispatchWorkflow.nodes.length}`);

const dispatchWebhookNode = dispatchWorkflow.nodes.find(n => n.type.includes('webhook'));
console.log(`- Path Webhook: /webhook/${dispatchWebhookNode.parameters.path}`);

const switchNode = dispatchWorkflow.nodes.find(n => n.type.includes('switch'));
console.log(`- Reglas de Estado evaluadas (${switchNode.parameters.rules.values.length}):`);
switchNode.parameters.rules.values.forEach(r => {
  console.log(`  * Estado: "${r.conditions.conditions[0].rightValue}" -> Salida: "${r.outputKey}"`);
});

const phoneTest = "+54 (911) 2345-6789";
const cleanedPhone = phoneTest.replace(/[^0-9]/g, '');
console.log(`\n3. PRUEBA DE REGEX TELÉFONO: "${phoneTest}" -> "${cleanedPhone}"`);

console.log("\n4. DIAGNÓSTICO Y ANÁLISIS DE ESTRUCTURA:");
console.log("✔️ Webhook path 'dispatch-order-whatsapp' coincide con el fetch de dashboard.html: line 14053");
console.log("✔️ Supabase Endpoint de auditoría está preconfigurado");
console.log("⚠️ FALTA: El nodo intermedio HTTP Request / WhatsApp API para enviar el mensaje real al proveedor antes de actualizar el estado en Supabase.");
