import { parseDocument } from 'yaml';

const content = `services:
  web:
    image: nginx:latest

networks:
  network_name:
    external: true

volumes:
  data:


secrets:
  secret_name:
    external: true`;

const doc = parseDocument(content);
console.log("Original YAML items:");
doc.contents.items.forEach((item, idx) => {
  console.log(`\nItem ${idx} (${item.key.value}):`);
  console.log("  spaceBefore:", item.spaceBefore);
  console.log("  range:", item.range);
  if (item.value) {
    console.log("  value.type:", item.value.type);
    console.log("  value.range:", item.value.range);
    console.log("  value.items:", item.value.items ? item.value.items.length : 'N/A');
  }
});

console.log("\n=== Content between volumes and secrets ===");
console.log("Line count:", content.split('\n').length);
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (idx >= 10 && idx <= 14) {
    console.log(`Line ${idx}: "${line}"`);
  }
});
