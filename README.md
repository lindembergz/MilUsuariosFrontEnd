Para listar 1000 itens em uma <ul><li> no Angular de forma performática, você deve considerar otimizações que minimizem o impacto no DOM e no processamento do Angular. Aqui estão as melhores práticas e a abordagem mais eficiente:

1. Use trackBy no *ngFor
O Angular recria elementos do DOM quando a lista muda, mesmo que os itens sejam os mesmos. Usar a função trackBy no *ngFor ajuda o Angular a rastrear itens pelo seu identificador único, evitando recriações desnecessárias.

typescript

Copiar
// No componente
trackByFn(index: number, item: any): any {
  return item.id; // Use um identificador único, como um ID
}
html

Copiar
<ul>
  <li *ngFor="let item of items; trackBy: trackByFn">{{ item.name }}</li>
</ul>
Benefício: Reduz significativamente a manipulação do DOM, especialmente para listas grandes.

2. Paginação ou Virtual Scroll
Listar 1000 itens de uma vez pode ser pesado para o navegador, mesmo com otimizações. Considere:

Paginação: Exiba apenas uma parte dos dados por vez (ex.: 10-50 itens por página).

Use uma biblioteca como @ng-bootstrap/ng-bootstrap ou implemente manualmente com slice no array.
typescript

Copiar
itemsPage = this.items.slice(0, 50); // Primeiros 50 itens
Virtual Scroll: Renderize apenas os itens visíveis na tela. Use o módulo @angular/cdk/scrolling.

bash

Copiar
ng add @angular/cdk
html

Copiar
<cdk-virtual-scroll-viewport itemSize="50" style="height: 400px;">
  <ul>
    <li *cdkVirtualFor="let item of items; trackBy: trackByFn">{{ item.name }}</li>
  </ul>
</cdk-virtual-scroll-viewport>
Benefício: O cdkVirtualScroll renderiza apenas os itens na área visível, reduzindo drasticamente o número de elementos no DOM (ex.: apenas 20-30 itens em vez de 1000).

3. Change Detection Strategy: OnPush
Configure o componente para usar a estratégia de detecção de mudanças OnPush. Isso faz com que o Angular só atualize o componente quando as referências de entrada mudarem, evitando verificações desnecessárias.

typescript

Copiar
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() items: any[] = [];
}
Benefício: Reduz verificações de mudança para listas grandes, melhorando a performance.
