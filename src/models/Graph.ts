export default class Graph {
  public edges: Record<string, string[]>;
  public referenceCounts: Record<string, number>;

  constructor(public elements: Set<string>) {
    this.edges = {} as Record<string, string[]>;
    this.referenceCounts = {} as Record<string, number>;
    this.elements.forEach(el => {
      this.edges[el] = [];
      this.referenceCounts[el] = 0;
    });
  }

  public setEdges(element: string, peers: string[]): void {
    if (this.edges[element].length > 0) {
      throw new Error(`Edges for element ${element} have already been set`);
    }

    const notFoundPeer = peers.find(peer => this.elements.has(peer) == false);
    if (notFoundPeer) {
      throw new Error(
        `${notFoundPeer} (peer of ${element}) is not present on list of available elements`
      );
    }

    this.edges[element] = peers;
    peers.forEach(peer => this.referenceCounts[peer]++);
  }

  public Clone(): Graph {
    const res = new Graph(new Set(this.elements));
    this.elements.forEach(v => {
      const peers = this.edges[v];
      res.setEdges(v, [...peers]);
    });
    return res;
  }

  public RemoveEdge(elemFrom: string, elemTo: string): void {
    const allPeers = this.edges[elemFrom];
    if (!allPeers) {
      throw new Error(elemFrom + ' was not found in the graph');
    }

    const foundIndex = allPeers.findIndex(x => x === elemTo);
    if (foundIndex > -1) {
      const existingReferenceCount = this.referenceCounts[elemTo];
      if (existingReferenceCount <= 0) {
        throw new Error(
          `Cannot remove edge ${elemFrom} -> ${elemTo} because references count of ${elemTo} = ${existingReferenceCount}`
        );
      }
      allPeers.splice(foundIndex, 1);
      this.referenceCounts[elemTo]--;
    } else {
      throw new Error(
        `The edge ${elemFrom} -> ${elemTo} cannot be removed because it does not exist`
      );
    }
  }

  //Kahn's algo
  public TopoSort(): string[] {
    const clonedGraph = this.Clone();
    const res: string[] = [];

    const getNodesWithNoIncomingEdges = (graph: Graph): Set<string> => {
      const res = new Set<string>();
      graph.elements.forEach(elem => {
        if (graph.referenceCounts[elem] == 0) {
          res.add(elem);
        }
      });
      return res;
    };

    const getFirstElementFromSet = (set: Set<string>) => {
      return set.values().next().value as string;
    };

    const nodesWithNoIncomingEdges = getNodesWithNoIncomingEdges(clonedGraph);
    while (nodesWithNoIncomingEdges.size > 0) {
      const n = getFirstElementFromSet(nodesWithNoIncomingEdges);
      nodesWithNoIncomingEdges.delete(n);
      res.push(n);

      const peersOfThatNode = [...clonedGraph.edges[n]];
      peersOfThatNode.forEach(m => {
        clonedGraph.RemoveEdge(n, m);
        if (clonedGraph.referenceCounts[m] == 0) {
          nodesWithNoIncomingEdges.add(m);
        }
      });
    }

    clonedGraph.elements.forEach(elem => {
      if (clonedGraph.edges[elem].length > 0) {
        throw new Error('Cycle detected');
      }
    });

    return res;

    /*
    const zeroIncomingEdgeElements = new Set<string>();
    for (const el in clonedGraph.elements) {
      if (incomingEdgesCounts[el] == 0) {
        zeroIncomingEdgeElements.add(el);
      }
    }



    while (zeroIncomingEdgeElements.size > 0) {
      const n = zeroIncomingEdgeElements
        .values()
        .next()
        .value();

      L.push(n);
    }

    */
  }
}
