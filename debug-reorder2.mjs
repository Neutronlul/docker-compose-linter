import { parseDocument, YAMLMap, isScalar } from 'yaml';

const content = `volumes:
  data:

services:
  web:
    image: nginx:latest

networks:
  network_name:
    external: true


secrets:
  secret_name:
    external: true`;

const doc = parseDocument(content);
const { contents } = doc;

console.log("=== Original order ===");
contents.items.forEach((item, idx) => {
  console.log(`${idx}: ${item.key.value}`);
});

// Reorder like the rule does - changing the order
const correctOrder = ['services', 'networks', 'volumes', 'secrets'];
const reorderedMap = new YAMLMap();

for (const key of correctOrder) {
  const item = contents.items.find((node) => isScalar(node.key) && String(node.key.value) === key);
  if (item) {
    reorderedMap.items.push(item);
  }
}

doc.contents = reorderedMap;

console.log("\n=== Reordered content ===");
console.log(doc.toString());
