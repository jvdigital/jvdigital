/*
  LUMEA — Configuração e dados locais iniciais.
  Tudo funciona sem base de dados externa. Os dados editados pelo painel interno ficam guardados no localStorage do navegador.
*/

window.LUMEA_CONFIG = {
  storageKey: 'lumea.local.data.v1',
  bookingStorageKey: 'lumea.local.bookings.v1',
  settingsStorageKey: 'lumea.local.settings.v1',
  adminSessionKey: 'lumea.admin.session.v1',
  defaultAdminPassword: 'admin123',
  googleAnalyticsId: 'G-XXXXXXXXXX',
  whatsappNumber: '351912345678',
  googleBusinessUrl: 'https://www.google.com/search?q=LUMEA+Atelier+Botanico',
  canonicalUrl: 'https://www.lumea.pt/',
  businessEmail: 'ola@lumea.pt',
  businessPhone: '+351 912 345 678',
  businessAddress: 'Rua das Flores 88, 4050-263 Porto, Portugal',
  businessGeo: { lat: 41.1466, lng: -8.6110 }
};

window.LUMEA_DEFAULT_DATA = {
  settings: {
    brand: 'LUMEA',
    tagline: {
      pt: 'Atelier botânico de fragrâncias, cerâmica e presentes sensoriais.',
      en: 'Botanical atelier for fragrance, ceramics and sensory gifts.'
    },
    whatsappNumber: '351912345678',
    googleAnalyticsId: 'G-XXXXXXXXXX',
    googleBusinessUrl: 'https://www.google.com/search?q=LUMEA+Atelier+Botanico',
    email: 'ola@lumea.pt',
    phone: '+351 912 345 678',
    address: 'Rua das Flores 88, 4050-263 Porto, Portugal',
    openingHours: {
      pt: 'Terça a sábado, 10:00–19:00',
      en: 'Tuesday to Saturday, 10:00–19:00'
    },
    appointmentDurationMinutes: 45,
    availableDays: [2,3,4,5,6],
    timeSlots: ['10:00','11:00','12:00','14:30','15:30','16:30','17:30'],
    seoKeywords: [
      'atelier botânico Porto',
      'velas artesanais portuguesas',
      'fragrâncias naturais',
      'cerâmica artesanal',
      'presentes premium Portugal'
    ]
  },
  services: [
    {
      id: 'consultoria-sensorial',
      icon: '✦',
      duration: 45,
      price: 'Gratuito',
      title: { pt: 'Consultoria sensorial', en: 'Sensory consultation' },
      description: {
        pt: 'Sessão personalizada para escolher fragrâncias, velas, peças e presentes com base no ambiente, estilo e ocasião.',
        en: 'Personalised session to choose fragrances, candles, pieces and gifts based on ambience, style and occasion.'
      }
    },
    {
      id: 'workshop-velas',
      icon: '◐',
      duration: 90,
      price: '45€',
      title: { pt: 'Workshop de velas botânicas', en: 'Botanical candle workshop' },
      description: {
        pt: 'Experiência privada para criar uma vela aromática com cera vegetal, essências naturais e acabamento cerâmico.',
        en: 'Private experience to create an aromatic candle with vegetable wax, natural essences and ceramic finish.'
      }
    },
    {
      id: 'curadoria-presentes',
      icon: '✺',
      duration: 60,
      price: 'Sob orçamento',
      title: { pt: 'Curadoria de presentes corporativos', en: 'Corporate gift curation' },
      description: {
        pt: 'Selecção de produtos, personalização e embalamento para marcas, hotéis, eventos e equipas.',
        en: 'Product selection, personalisation and packaging for brands, hotels, events and teams.'
      }
    }
  ],
  products: [
    {
      id: 'aurora',
      category: 'Velas',
      price: '32€',
      image: 'assets/images/produto-aurora.svg',
      title: { pt: 'Vela Aurora em cerâmica', en: 'Aurora ceramic candle' },
      description: {
        pt: 'Notas de figo, chá branco e madeira clara numa peça de cerâmica feita à mão.',
        en: 'Fig, white tea and pale wood notes in a handmade ceramic vessel.'
      },
      alt: { pt: 'Vela artesanal Aurora em recipiente de cerâmica', en: 'Aurora handmade candle in ceramic vessel' }
    },
    {
      id: 'terra',
      category: 'Cerâmica',
      price: '48€',
      image: 'assets/images/produto-terra.svg',
      title: { pt: 'Taça Terra Ritual', en: 'Terra Ritual bowl' },
      description: {
        pt: 'Taça texturada para chá, flores secas ou pequenos rituais de casa.',
        en: 'Textured bowl for tea, dried flowers or small home rituals.'
      },
      alt: { pt: 'Taça artesanal Terra Ritual', en: 'Handmade Terra Ritual bowl' }
    },
    {
      id: 'nocturne',
      category: 'Fragrâncias',
      price: '39€',
      image: 'assets/images/produto-nocturne.svg',
      title: { pt: 'Difusor Nocturne', en: 'Nocturne diffuser' },
      description: {
        pt: 'Âmbar, lavanda e cedro para espaços calmos e sofisticados.',
        en: 'Amber, lavender and cedar for calm, refined spaces.'
      },
      alt: { pt: 'Difusor aromático Nocturne', en: 'Nocturne aromatic diffuser' }
    },
    {
      id: 'jardim',
      category: 'Presentes',
      price: '65€',
      image: 'assets/images/produto-jardim.svg',
      title: { pt: 'Caixa Jardim Secreto', en: 'Secret Garden gift box' },
      description: {
        pt: 'Conjunto de vela, mini difusor, cartão perfumado e embrulho premium.',
        en: 'Gift set with candle, mini diffuser, scented card and premium wrapping.'
      },
      alt: { pt: 'Caixa presente Jardim Secreto', en: 'Secret Garden gift box' }
    }
  ],
  faqs: [
    {
      q: { pt: 'As marcações ficam guardadas onde?', en: 'Where are appointments stored?' },
      a: { pt: 'Ficam guardadas localmente no navegador/painel interno. Pode exportar e importar os dados em JSON.', en: 'They are stored locally in the browser/internal panel. You can export and import JSON data.' }
    },
    {
      q: { pt: 'Posso trocar as fotografias?', en: 'Can I change the photos?' },
      a: { pt: 'Sim. No painel interno pode adicionar imagens por URL ou carregar ficheiros locais.', en: 'Yes. In the internal panel you can add images by URL or upload local files.' }
    },
    {
      q: { pt: 'O assistente usa uma API externa?', en: 'Does the assistant use an external API?' },
      a: { pt: 'Nesta versão é um assistente local, sem custos e sem envio de dados para terceiros.', en: 'In this version it is a local assistant, with no costs and no data sent to third parties.' }
    }
  ],
  bookings: []
};
