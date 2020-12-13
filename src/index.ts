import StackSet from './models/StackSet';
import Graph from './models/Graph';

const s1 = new StackSet<number>();
s1.push(1);
s1.push(2);
s1.push(3);

const nodes: Array<{ key: number; peers: Array<number> }> = [
  { key: 2, peers: [] },
  { key: 11, peers: [2, 9, 10] },
  { key: 5, peers: [11] },
  { key: 9, peers: [] },
  { key: 8, peers: [9] },
  { key: 7, peers: [8, 11] },
  { key: 3, peers: [8, 10] },
  { key: 10, peers: [] },
];

const elements = new Set<string>();
nodes.map(x => x.key.toString()).forEach(x => elements.add(x));
const graph = new Graph(elements);

nodes.forEach(node => {
  const peers = node.peers.map(x => x.toString());
  graph.setEdges(node.key.toString(), peers);
});

const topoOrder = graph.TopoSort();

console.log(JSON.stringify(topoOrder, null, ''));
