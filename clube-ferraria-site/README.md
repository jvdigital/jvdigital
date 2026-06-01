# Novo site — Clube Ferraria

Site estático completo, pronto a publicar. Não precisa de WordPress, base de dados nem instalação.

## Como publicar

1. Entra no painel do alojamento do domínio `clubeferraria.pt`.
2. Abre o gestor de ficheiros ou FTP.
3. Faz backup do site antigo.
4. Envia todos os ficheiros desta pasta para `public_html` ou para a pasta raiz configurada no domínio.
5. Abre `https://www.clubeferraria.pt/` e confirma se as páginas carregam.

## Estrutura

- `index.html` — página inicial
- `historia.html` — história e corpos sociais
- `raid-2026.html` — página do Raid Ferraria 2026, galeria, vídeo e dossiers oficiais
- `festa.html` — Festa da Ferraria / Festa de Verão, programa, bar, artistas e galeria social
- `karate.html` — secção de karaté
- `socios.html` — sócios, quotas e IBAN
- `alojamento.html` — lista pesquisável de alojamentos
- `contactos.html` — contactos, mapa e formulário por email
- `documentos.html` — documentos oficiais
- `arquivo.html` — arquivo visual e ligações aos dossiers antigos
- `assets/css/styles.css` — design visual
- `assets/js/app.js` — menu mobile, pesquisa, cookies, copiar IBAN/email e formulário

## Notas desta versão

- O símbolo atual do Raid Ferraria — Desde 1991 está aplicado no cabeçalho, rodapé e favicon.
- A secção que permitia/indicava colocar ou acrescentar fotos foi retirada.
- O Reel público de Facebook foi incorporado na aba Rally/Raid.
- O cartaz de 2010 enviado foi integrado no arquivo visual.
- Foi criada a página `festa.html`, com destaque na página inicial, ligações públicas a publicações de Festa de Verão e área pronta para cartazes/fotografias anuais.
- A página `arquivo.html` e a aba Rally/Raid incluem ligações aos dossiers oficiais por ano, de 2003 a 2026, para consulta de classificações, documentos e informação de prova.

## Conteúdos rápidos

- Email do clube: procurar por `geral@clubeferraria.pt` nos ficheiros HTML e JS.
- IBAN: procurar por `PT50 0045 6434 4013 0699 0400 2` em `socios.html`.
- Links dos PDFs/documentos atuais: estão nos botões de `documentos.html`, `socios.html`, `raid-2026.html`, `arquivo.html` e rodapé.
- Alojamentos: cartões em `alojamento.html`.
- Festa da Ferraria: editar `festa.html` para trocar programa, artistas, preço e publicações anuais.
- Cores e visual: `assets/css/styles.css`.
