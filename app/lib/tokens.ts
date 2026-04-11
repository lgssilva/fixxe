export const C = {
  bg:          "#1f1b18",
  bgCard:      "#2a2521",
  bgLight:     "#f5f4f2",
  bgWhite:     "#ffffff",
  orange:      "#ee924d",
  cream:       "#f5f4f2",
  creamMuted:  "#c9c7c4",
  dark:        "#1f1b18",
  darkMuted:   "#4a4540",
  border:      "#3a342e",
  borderLight: "#e8e5e1",
};

export const MAT_COLOR: Record<string, string> = {
  PLA:    "#6dbe6d",
  PETG:   "#5ba3d9",
  ABS:    "#d9875b",
  Resina: "#b06dd9",
};

export type Material = "PLA" | "PETG" | "ABS" | "Resina";
export type Category = "Decoração & Arte" | "Organização" | "Ferramentas" | "Personalizado";

export interface Product {
  id:         number;
  slug:       string;
  name:       string;
  price:      number;
  material:   Material;
  category:   Category;
  desc:       string;
  weight:     string;
  dimensions: string;
}

export const ALL_PRODUCTS: Product[] = [
  { id:  1, slug: "vaso-geometrico-minimalista",     name: "Vaso Geométrico Minimalista",       price:  24.90, material: "PLA",    category: "Decoração & Arte", desc: "Acabamento mate premium, 18 cm de altura. Design exclusivo.",          weight: "180 g",   dimensions: "12 × 12 × 18 cm" },
  { id:  2, slug: "organizador-secretaria-modular",  name: "Organizador de Secretária Modular", price:  38.50, material: "PETG",   category: "Organização",      desc: "Múltiplos compartimentos, resistente ao calor.",                        weight: "310 g",   dimensions: "30 × 15 × 10 cm" },
  { id:  3, slug: "suporte-telemovel-universal",     name: "Suporte de Telemóvel Universal",    price:  14.90, material: "ABS",    category: "Organização",      desc: "Ângulo ajustável, base antiderrapante.",                                weight:  "95 g",   dimensions: "10 × 8 × 12 cm"  },
  { id:  4, slug: "figura-decorativa-dragao",        name: "Figura Decorativa — Dragão",        price:  54.00, material: "Resina", category: "Decoração & Arte", desc: "Detalhes ultra finos, edição limitada.",                                weight: "220 g",   dimensions: "14 × 8 × 20 cm"  },
  { id:  5, slug: "caixa-componentes-eletronica",    name: "Caixa de Componentes Eletrónica",   price:  22.00, material: "ABS",    category: "Ferramentas",      desc: "Divisórias ajustáveis, encaixe perfeito.",                              weight: "185 g",   dimensions: "20 × 14 × 6 cm"  },
  { id:  6, slug: "vaso-ondulado-espiralado",        name: "Vaso Ondulado Espiralado",          price:  31.50, material: "PLA",    category: "Decoração & Arte", desc: "Textura espiral única, perfeito para flores secas.",                    weight: "210 g",   dimensions: "10 × 10 × 22 cm" },
  { id:  7, slug: "suporte-monitor-ajustavel",       name: "Suporte para Monitor Ajustável",    price:  45.00, material: "PETG",   category: "Organização",      desc: "Suporta até 8 kg, ajustável em altura.",                               weight: "420 g",   dimensions: "35 × 25 × 18 cm" },
  { id:  8, slug: "moldura-minimalista-10x15",       name: "Moldura Minimalista 10×15",         price:  12.90, material: "PLA",    category: "Decoração & Arte", desc: "Design clean, suporte de mesa ou parede.",                              weight:  "80 g",   dimensions: "14 × 11 × 1.5 cm"},
  { id:  9, slug: "porta-chaves-personalizado",      name: "Porta-Chaves Personalizado",        price:   8.50, material: "Resina", category: "Personalizado",    desc: "Com nome ou logótipo gravado, várias cores.",                           weight:  "15 g",   dimensions: "6 × 3 × 0.5 cm"  },
  { id: 10, slug: "base-planta-geometrica",          name: "Base para Planta Geométrica",       price:  19.90, material: "PLA",    category: "Decoração & Arte", desc: "Vaso baixo geométrico, ideal para suculentas.",                         weight: "140 g",   dimensions: "12 × 12 × 7 cm"  },
  { id: 11, slug: "rack-ferramentas-parede",         name: "Rack para Ferramentas de Parede",   price:  32.00, material: "ABS",    category: "Ferramentas",      desc: "Fixação por parafuso, suporta ferramentas até 500 g.",                  weight: "260 g",   dimensions: "40 × 8 × 5 cm"   },
  { id: 12, slug: "caixa-medicamentos-semanal",      name: "Caixa de Medicamentos Semanal",     price:  18.50, material: "PETG",   category: "Organização",      desc: "Food-safe, 7 compartimentos com tampa.",                               weight: "190 g",   dimensions: "18 × 10 × 4 cm"  },
  { id: 13, slug: "escultura-abstrata-modular",      name: "Escultura Abstrata Modular",        price:  89.00, material: "Resina", category: "Decoração & Arte", desc: "Peça de arte em 3 módulos encaixáveis.",                                weight: "380 g",   dimensions: "15 × 15 × 30 cm" },
  { id: 14, slug: "organizador-cabos-mesa",          name: "Organizador de Cabos de Mesa",      price:  15.90, material: "PLA",    category: "Organização",      desc: "Mantém os cabos organizados e acessíveis.",                             weight: "110 g",   dimensions: "20 × 6 × 4 cm"   },
  { id: 15, slug: "jig-soldadura-ajustavel",         name: "Jig de Soldadura Ajustável",        price:  27.50, material: "ABS",    category: "Ferramentas",      desc: "Para mãos-livres na bancada de trabalho.",                              weight: "230 g",   dimensions: "22 × 12 × 10 cm" },
  { id: 16, slug: "suporte-livros-geometrico",       name: "Suporte de Livros Geométrico",      price:  34.00, material: "PETG",   category: "Organização",      desc: "Par de suportes, resistente, design moderno.",                          weight: "300 g",   dimensions: "16 × 6 × 20 cm"  },
  { id: 17, slug: "figura-animal-lobo",              name: "Figura de Animal — Lobo",           price:  48.00, material: "Resina", category: "Decoração & Arte", desc: "Escultura detalhada, pose dinâmica.",                                   weight: "195 g",   dimensions: "18 × 9 × 16 cm"  },
  { id: 18, slug: "caixa-ferramentas-modular",       name: "Caixa de Ferramentas Modular",      price:  55.00, material: "ABS",    category: "Ferramentas",      desc: "Sistema de encaixe, expansível com módulos extra.",                    weight: "490 g",   dimensions: "35 × 20 × 12 cm" },
  { id: 19, slug: "vaso-parede-hexagonal",           name: "Vaso de Parede Hexagonal",          price:  22.90, material: "PLA",    category: "Decoração & Arte", desc: "Para fixar na parede, conjunto de 3 unidades.",                         weight: "160 g",   dimensions: "14 × 12 × 8 cm"  },
  { id: 20, slug: "organizador-gaveta-modular",      name: "Organizador de Gaveta Modular",     price:  29.50, material: "PETG",   category: "Organização",      desc: "Encaixes flexíveis, adaptável a qualquer gaveta.",                      weight: "240 g",   dimensions: "25 × 20 × 5 cm"  },
  { id: 21, slug: "prototipo-peca-industrial",       name: "Protótipo de Peça Industrial",      price: 120.00, material: "ABS",    category: "Personalizado",    desc: "Sob medida com base no teu ficheiro CAD.",                              weight: "—",       dimensions: "Personalizado"   },
  { id: 22, slug: "miniatura-arquitetonica",         name: "Miniatura Arquitetónica",            price:  75.00, material: "Resina", category: "Personalizado",    desc: "Maquete detalhada para apresentações.",                                 weight: "—",       dimensions: "Personalizado"   },
  { id: 23, slug: "suporte-oculos-mesa",             name: "Suporte para Óculos — Mesa",        price:  11.90, material: "PLA",    category: "Organização",      desc: "Protege as hastes, design elegante.",                                   weight:  "70 g",   dimensions: "10 × 8 × 9 cm"   },
  { id: 24, slug: "chaveiro-logotipo",               name: "Chaveiro com Logótipo",             price:   9.90, material: "Resina", category: "Personalizado",    desc: "Logótipo ou texto à tua escolha, acabamento brilhante.",                weight:  "18 g",   dimensions: "5 × 3 × 0.6 cm"  },
  { id: 25, slug: "suporte-tablet-dobravavel",       name: "Suporte para Tablet Dobrável",      price:  42.00, material: "PETG",   category: "Organização",      desc: "Ângulo ajustável, base larga para estabilidade.",                       weight: "280 g",   dimensions: "22 × 18 × 12 cm" },
  { id: 26, slug: "vaso-twist-20cm",                 name: "Vaso Twist 20 cm",                  price:  27.90, material: "PLA",    category: "Decoração & Arte", desc: "Forma torcida impressionante, impressão contínua.",                     weight: "200 g",   dimensions: "10 × 10 × 20 cm" },
  { id: 27, slug: "caixa-baralho-cartas",            name: "Caixa de Baralho de Cartas",        price:  16.50, material: "PLA",    category: "Personalizado",    desc: "Tampa magnética, encaixe perfeito para 54 cartas.",                    weight: "120 g",   dimensions: "10 × 7 × 2.5 cm" },
  { id: 28, slug: "peca-xadrez-personalizada",       name: "Peça de Xadrez Personalizada",      price:  65.00, material: "Resina", category: "Personalizado",    desc: "Conjunto de 32 peças com design exclusivo.",                           weight: "350 g",   dimensions: "Variadas"        },
  { id: 29, slug: "bracket-camara-seguranca",        name: "Bracket para Câmara de Segurança",  price:  19.90, material: "ABS",    category: "Ferramentas",      desc: "Compatível com câmaras até 500 g.",                                    weight: "140 g",   dimensions: "10 × 8 × 10 cm"  },
  { id: 30, slug: "suporte-headphones",              name: "Suporte para Headphones",           price:  38.00, material: "PETG",   category: "Organização",      desc: "Fixação à secretária, ajustável.",                                      weight: "290 g",   dimensions: "10 × 12 × 25 cm" },
  { id: 31, slug: "luminaria-geometrica",            name: "Luminária Geométrica",              price:  44.90, material: "PLA",    category: "Decoração & Arte", desc: "Encaixe para E14, projeção de sombras decorativas.",                   weight: "160 g",   dimensions: "18 × 18 × 20 cm" },
  { id: 32, slug: "organizador-escritorio-4em1",     name: "Organizador de Escritório 4-em-1",  price:  52.00, material: "PETG",   category: "Organização",      desc: "Canetas, post-its, clipes e smartphone num só lugar.",                  weight: "360 g",   dimensions: "22 × 14 × 16 cm" },
  { id: 33, slug: "peca-reposicao-personalizada",    name: "Peça de Reposição Personalizada",   price:  35.00, material: "ABS",    category: "Personalizado",    desc: "Substitui peças quebradas com precisão milimétrica.",                  weight: "—",       dimensions: "Personalizado"   },
  { id: 34, slug: "diorama-miniatura",               name: "Diorama Miniatura 10×10",           price:  99.00, material: "Resina", category: "Decoração & Arte", desc: "Cena detalhada em miniatura, peça de colecionador.",                   weight: "420 g",   dimensions: "10 × 10 × 8 cm"  },
];
