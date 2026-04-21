export interface SkillItem {
  icon: string
  label: string
}

export interface SkillCategory {
  title: string
  skills: SkillItem[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { icon: 'fab fa-html5', label: 'HTML5' },
      { icon: 'fab fa-css3-alt', label: 'CSS3' },
      { icon: 'fab fa-js', label: 'JavaScript' },
      { icon: 'fab fa-react', label: 'React.js' },
      { icon: 'fab fa-bootstrap', label: 'Bootstrap' },
      { icon: 'fab fa-sass', label: 'Sass' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { icon: 'fas fa-database', label: 'MySQL' },
      { icon: 'fab fa-php', label: 'PHP' },
      { icon: 'fab fa-laravel', label: 'Laravel' },
      { icon: 'fa-solid fa-code-compare', label: 'API' },
      { icon: 'fa-solid fa-laptop-code', label: 'OOP' },
      { icon: 'fa-brands fa-codepen', label: 'Data Structure' },
    ],
  },
  {
    title: 'WordPress',
    skills: [
      { icon: 'fab fa-wordpress', label: 'WordPress' },
      { icon: 'fas fa-shopping-cart', label: 'WooCommerce' },
      { icon: 'fas fa-palette', label: 'Elementor' },
      { icon: 'fas fa-edit', label: 'ACF' },
      { icon: 'fab fa-php', label: 'PHP' },
      { icon: 'fas fa-paint-brush', label: 'Theme Dev' },
    ],
  },
  {
    title: 'Tools & Other',
    skills: [
      { icon: 'fab fa-git-alt', label: 'Git' },
      { icon: 'fab fa-github', label: 'GitHub' },
      { icon: 'fab fa-figma', label: 'Figma' },
      { icon: 'fab fa-shopify', label: 'Shopify' },
      { icon: 'fas fa-store', label: 'Salla' },
      { icon: 'fas fa-shopping-bag', label: 'Zed' },
    ],
  },
]
