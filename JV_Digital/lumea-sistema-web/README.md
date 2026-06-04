# LUMEA — Sistema web local completo

Projecto pronto a usar em português de Portugal, com versão inglesa, para uma gestão interna simples com dados locais.

## O que está incluído

- Site público responsivo, premium e bilingue PT/EN.
- Sistema de marcações online guardado em dados locais do navegador.
- Painel interno em `admin.html` para gerir marcações, produtos, serviços, SEO, Google Analytics e contactos.
- Galeria de produtos com lightbox.
- Botão WhatsApp flutuante.
- Botão de assistente IA local, sem API externa e sem custos.
- SEO avançado: metatags, canonical, hreflang, Open Graph, Twitter Card, Schema LocalBusiness, FAQ schema, sitemap e robots.
- Google Analytics 4 com consentimento de cookies antes de carregar o script.
- Preparado para Google Business Profile através de URL, NAP e dados estruturados.
- Exportação/importação JSON para cópias de segurança dos dados locais.

## Como abrir localmente

A forma mais simples é abrir a pasta num servidor estático. Na pasta do projecto, execute:

```bash
python3 -m http.server 8080
```

Depois abra:

```text
http://localhost:8080
```

Painel interno:

```text
http://localhost:8080/admin.html
```

Palavra-passe inicial:

```text
admin123
```

Altere a palavra-passe em **Gestão interna → SEO & definições** antes de publicar.

## Configurações obrigatórias antes de publicar

No painel interno, actualize:

1. Nome da marca, email, telefone e morada.
2. Número WhatsApp em formato internacional sem `+`, por exemplo `351912345678`.
3. URL do Perfil de Empresa no Google.
4. Google Analytics 4 Measurement ID, por exemplo `G-ABCD123456`.
5. Horários, serviços, preços e produtos.
6. Palavra-passe do painel interno.

Também deve substituir `https://www.lumea.pt/` pelo seu domínio real em:

- `index.html`
- `sitemap.xml`
- `robots.txt`
- `manifest.webmanifest`, se necessário
- `js/config.js`, no campo `canonicalUrl`

## Como publicar

Pode publicar como site estático em qualquer alojamento:

- Netlify
- Vercel
- Cloudflare Pages
- cPanel / alojamento tradicional
- GitHub Pages

Para cPanel, envie todos os ficheiros da pasta para `public_html`.

## Notas importantes sobre “dados locais”

Esta versão foi construída de acordo com o pedido de dados locais. Isso significa:

- As marcações ficam guardadas no navegador/dispositivo onde são criadas.
- O painel interno lê os dados locais desse mesmo navegador.
- Pode exportar/importar JSON para migrar ou fazer backup.

Se quiser que marcações de clientes em dispositivos diferentes apareçam automaticamente num painel central, será necessário ligar uma base de dados ou serviço externo, como Supabase, Firebase, Airtable, Google Sheets API ou um backend próprio.

## Google Analytics e RGPD

O Google Analytics só é carregado após o utilizador aceitar o banner de cookies. Isto ajuda a cumprir boas práticas de privacidade. Ainda assim, deve adaptar a Política de Privacidade à sua empresa e consultar apoio jurídico quando necessário.

## Google Business Profile

Este projecto não cria nem verifica automaticamente o Perfil de Empresa no Google, porque isso exige validação pelo Google. O site já inclui:

- Dados estruturados LocalBusiness.
- Link para o perfil no Google.
- Contactos e morada consistentes.
- Sitemap e robots.

Depois de criar/verificar o perfil, cole o URL público no painel interno.

## Estrutura

```text
lumea-sistema-web/
├── index.html
├── admin.html
├── privacidade.html
├── css/styles.css
├── js/config.js
├── js/app.js
├── js/admin.js
├── assets/images/
├── data/site-data.json
├── robots.txt
├── sitemap.xml
├── manifest.webmanifest
├── netlify.toml
└── docs/
```

## Personalização rápida

- Cores: edite as variáveis em `css/styles.css`, no bloco `:root`.
- Conteúdo inicial: edite `js/config.js`.
- Produtos e serviços: use o painel interno ou edite `js/config.js`.
- Domínio: substitua `https://www.lumea.pt/` pelo domínio final.

