const { parseDocument } = require('./node_modules/yaml/dist/index.js');

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
  console.log(`Item ${idx} (${item.key.value}):`, 
    "spaceBefore:", item.spaceBefore,
    "value type:", item.value ? item.value.type : 'null');
});

console.log("\n\nStringified:");
console.log(doc.toString());
