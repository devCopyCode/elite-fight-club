# Elite Fight Club — Design Spec

## Identidade

- **Nome:** Elite Fight Club
- **Nicho:** Academia de Muay Thai premium — São Paulo, BR
- **Nível:** $10k premium — não é template, é produto
- **Mood:** Escuro, cinético, editorial esportivo. Referência: sites como ZARO Fitness e Siam Elite Muay Thai.

## Paleta

| Token | Hex | Uso |
|---|---|---|
| `--black` | `#0A0A0A` | Fundo global |
| `--red` | `#CC0000` | Accents, CTAs, destaque |
| `--white` | `#F5F5F5` | Textos primários |
| `--gray` | `#1A1A1A` | Cards, separadores |
| `--gray-mid` | `#555555` | Textos secundários |

## Tipografia

- **Display (títulos):** `Bebas Neue` — via `next/font/google`, peso 400 (a fonte já é bold por natureza). Condensada, agressiva, uppercase obrigatório.
- **Accent (destaque itálico):** `Barlow Condensed` weight 700, `font-style: italic` — usado em palavras-chave dentro dos títulos (ex: "FIGHT" em itálico vermelho dentro de um título Bebas Neue).
- **Body:** `Inter` — via `next/font/google`. Weight 400 para parágrafos, 600 para labels/subtítulos.
- **Tamanhos base:** `clamp()` responsivo — títulos h1: `clamp(48px, 8vw, 96px)`, h2: `clamp(32px, 5vw, 64px)`.

## Layout Aprovado — Split Editorial

Hero usa **split 50/50** com linha vermelha vertical como divisória:
- Esquerda (50%): texto, CTA, stats
- Linha divisória: `1px solid #CC0000` com gradient fade top/bottom
- Direita (50%): foto atleta em ação (stock Muay Thai, cinematic)
- Stats bar: row no rodapé do hero, corre borda a borda quebrando o grid

## Anti-IA: O que NÃO fazer

- ❌ Sem gradientes genéricos roxo/azul
- ❌ Sem cards com border-radius grande e sombra leve
- ❌ Sem grid perfeito e simétrico em todas as seções
- ❌ Sem ícones emoji
- ❌ Sem hover states óbvios (scale 1.05 em tudo)
- ✅ Cortes diagonais em seções via `clip-path`
- ✅ Texto com `letter-spacing` agressivo nos labels
- ✅ "FIGHT" ou palavra de destaque em itálico + vermelho dentro de título bold
- ✅ Linha vermelha fina (`1px`) como elemento de design (divisórias, underlines)
- ✅ CTA com `clip-path: polygon()` — ângulo no canto direito
- ✅ Números das stats com `font-variant-numeric: tabular-nums`

## Seções e Ordem

### 1. Navbar
- Fixo no topo, `background: rgba(10,10,10,0.92)`, `backdrop-filter: blur(12px)`
- Logo esquerda (texto "ELITE FIGHT CLUB" em Bebas Neue)
- Links centralizados: Sobre · Modalidades · Instrutores · Horários · Planos
- CTA direita: botão vermelho "AGENDE AULA"
- Mobile: hamburguer → drawer full-screen preto com links grandes
- Toggle PT/EN: floating bottom-right, `z-index: 1000`

### 2. Hero (Split Editorial)
- Fundo: `#0A0A0A`
- Esquerda: label "MUAY THAI · EST. 2018" (Inter, 10px, letter-spacing 5px, vermelho) → Título 3 linhas (Bebas Neue gigante) → linha vermelha 40px → parágrafo body → 2 CTAs (primário vermelho clip-path + secundário outline) → stats row
- Direita: `<Image>` Next.js de atleta Muay Thai, `object-fit: cover`, `priority`
- Divisória: `1px` vermelho vertical, gradient fade nos extremos
- Animação entrada: `framer-motion` — texto esquerda desliza da esquerda, imagem direita desliza da direita, stagger 0.15s

### 3. Marquee Banner
- Fundo: `#CC0000`
- Texto branco uppercase: `MUAY THAI · BOXE · KICKBOXING · DEFESA PESSOAL · CONDICIONAMENTO FÍSICO · `
- CSS keyframes `marquee` infinito, `animation-duration: 20s`
- Texto branco, `letter-spacing: 4px`, Inter 12px

### 4. Sobre (Stats + Historia)
- Fundo: `#0A0A0A`
- 4 stats em row com CountUp animado (`useInView` + `useEffect` incrementando número)
- Título seção + parágrafo historia da academia
- Foto secundária com corte diagonal `clip-path: polygon(0 0, 95% 0, 100% 100%, 5% 100%)`

### 5. Modalidades (6 cards)
- Grid 3×2 no desktop, 1 coluna no mobile
- Cards: fundo `#1A1A1A`, borda `1px solid #222`, sem border-radius arredondado (4px max)
- Hover: borda vira `1px solid #CC0000`, fundo leve `rgba(204,0,0,0.05)`
- 6 modalidades: Muay Thai · Boxe · Kickboxing · Defesa Pessoal · Fitness Combat · Kids
- Ícone: `lucide-react` (Swords, Target, Zap, Shield, Flame, Star)

### 6. Instrutores
- Fundo: `#111`
- Grid 3 cards desktop / 1 mobile
- Foto P&B com overlay vermelho no hover
- Nome (Bebas Neue) + título (Inter) + anos de experiência

### 7. Horários (Tabela)
- Fundo: `#0A0A0A`
- Tabela semanal estilizada: dias como colunas, horários como linhas
- Células com cor por modalidade
- Sem biblioteca externa — HTML table com Tailwind

### 8. Planos (Tabs Adulto/Kids)
- 2 tabs: Adulto | Kids
- 3 cards de planos por tab (Básico, Intermediário, Premium)
- Card premium: borda vermelha, badge "MAIS POPULAR"
- CTA por card

### 9. Contato
- Formulário: Nome, Email, WhatsApp, Mensagem
- Endereço + mapa embed (Google Maps iframe)
- Ícones sociais: sem Youtube/Instagram (não existem na versão instalada do lucide-react) — usar texto "IG" e "YT" estilizados ou `ExternalLink` do lucide

### 10. Footer
- Logo + tagline
- Links agrupados
- Copyright
- Linha vermelha topo

## Bilíngue PT/EN

- `useState<'pt' | 'en'>` no `page.tsx`, passado como prop para todos os componentes
- Toggle: botão flutuante bottom-right, `PT | EN`, sem biblioteca i18n
- Textos hardcoded em objeto `{ pt: '...', en: '...' }` por seção

## Stack

- Next.js 15 (App Router, já scaffoldado)
- Tailwind v4 (`@import "tailwindcss"` em globals.css)
- TypeScript
- `framer-motion` (já instalado)
- `lucide-react` (já instalado — atenção: `Youtube` e `Instagram` NÃO existem nessa versão)
- `next/font/google` — Bebas Neue + Barlow Condensed + Inter
- Imagens: `next/image` com stock photos de Muay Thai (URLs do Unsplash/Pexels)

## Imagens

Usar stock photos gratuitas de Muay Thai em alta qualidade:
- Hero: lutador em ação com luvas vermelhas, fundo escuro, iluminação dramática
- Instrutores: retratos P&B ou com overlay
- Sobre: academia/treino
- Fonte sugerida: `images.unsplash.com` com parâmetros `?w=1200&q=80`

## Animações (framer-motion)

- `fadeInUp`: `opacity: 0 → 1`, `y: 30 → 0`, `duration: 0.6`
- `fadeInLeft`: `opacity: 0 → 1`, `x: -40 → 0`
- `fadeInRight`: `opacity: 0 → 1`, `x: 40 → 0`
- Todas com `useInView({ once: true, margin: "-100px" })`
- Stagger em listas: `staggerChildren: 0.1`
- Hero entra automaticamente sem scroll trigger

## CSS Custom Properties (globals.css)

```css
@import "tailwindcss";

@theme {
  --color-black: #0A0A0A;
  --color-red: #CC0000;
  --color-white: #F5F5F5;
  --color-gray: #1A1A1A;
  --color-gray-mid: #555555;
}
```

## Estrutura de Arquivos

```
app/
  layout.tsx          ← fonts, metadata, html/body
  page.tsx            ← orquestra todas as seções, estado de idioma
  globals.css         ← @import tailwindcss + @theme tokens
  components/
    Navbar.tsx
    Hero.tsx
    MarqueeBanner.tsx
    Sobre.tsx
    Modalidades.tsx
    Instrutores.tsx
    Horarios.tsx
    Planos.tsx
    Contato.tsx
    Footer.tsx
    LangToggle.tsx
```
