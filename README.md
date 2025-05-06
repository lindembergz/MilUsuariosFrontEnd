<h2>Para listar 1000 itens no Angular de forma performática</h2>

<p>No Angular, você deve considerar otimizações que minimizem o impacto no DOM e no processamento do framework. Aqui estão as melhores práticas e a abordagem mais eficiente:</p>

<h3>1. Use <code>trackBy</code> no <code>*ngFor</code></h3>
<p>O Angular recria elementos do DOM quando a lista muda, mesmo que os itens sejam os mesmos. Usar a função <code>trackBy</code> ajuda a rastrear os itens pelo seu identificador único, evitando recriações desnecessárias.</p>

<h4>TypeScript</h4>
<pre><code class="language-typescript">
// No componente
trackByFn(index: number, item: any): any {
  return item.id; // Use um identificador único, como um ID
}
</code></pre>

<h4>HTML</h4>
<pre><code class="language-html">
<ul>
  <li *ngFor="let item of items; trackBy: trackByFn">{{ item.name }}</li>
</ul>
</code></pre>

<p><strong>Benefício:</strong> Reduz significativamente a manipulação do DOM, especialmente para listas grandes.</p>

<h3>2. Paginação ou Virtual Scroll</h3>
<p>Listar 1000 itens de uma vez pode ser pesado para o navegador, mesmo com otimizações. Considere:</p>

<ul>
  <li><strong>Paginação:</strong> Exiba apenas uma parte dos dados por vez (ex.: 10-50 itens por página).</li>
  <li><strong>Virtual Scroll:</strong> Renderize apenas os itens visíveis na tela com <code>@angular/cdk/scrolling</code>.</li>
</ul>

<h4>TypeScript - Paginação</h4>
<pre><code class="language-typescript">
itemsPage = this.items.slice(0, 50); // Primeiros 50 itens
</code></pre>

<h4>Instalação do CDK</h4>
<pre><code class="language-bash">
ng add @angular/cdk
</code></pre>

<h4>HTML - Virtual Scroll</h4>
<pre><code class="language-html">
<cdk-virtual-scroll-viewport itemSize="50" style="height: 400px;">
  <ul>
    <li *cdkVirtualFor="let item of items; trackBy: trackByFn">{{ item.name }}</li>
  </ul>
</cdk-virtual-scroll-viewport>
</code></pre>

<p><strong>Benefício:</strong> O <code>cdkVirtualScroll</code> renderiza apenas os itens visíveis, reduzindo drasticamente o número de elementos no DOM (ex.: apenas 20-30 itens em vez de 1000).</p>

<h3>3. Change Detection Strategy: OnPush</h3>
<p>Configure o componente para usar a estratégia de detecção de mudanças <code>OnPush</code>. Isso faz com que o Angular só atualize o componente quando as referências de entrada mudarem.</p>

<h4>TypeScript</h4>
<pre><code class="language-typescript">
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() items: any[] = [];
}
</code></pre>

<p><strong>Benefício:</strong> Reduz verificações de mudança para listas grandes, melhorando a performance.</p>
