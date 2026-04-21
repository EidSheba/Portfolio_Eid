export interface Project {
  title: string
  description: string
  images: { src: string; alt: string }[]
  liveLink: string
  subtitle: string
}

export const projects: Project[] = [
  {
    title: 'Azura',
    description:
      'A Shopify-based store on Azura that showcases modern products with a clean design, providing users with a smooth shopping experience, easy navigation, and secure checkout for a reliable and convenient online purchase journey.',
    images: [
      { src: '/images/azora1.webp', alt: 'Azora website interface' },
      { src: '/images/azora2.webp', alt: 'Azora product showcase' },
      { src: '/images/azora.webp', alt: 'Azora checkout process' },
    ],
    liveLink: 'https://azuramodest.net/',
    subtitle: 'Shopify · Luxury Modest Fashion',
  },
  {
    title: 'Thag Company',
    description:
      'Creative interior design and execution studio delivering modern, high-quality spaces with precision and style. We transform ideas into functional, elegant environments that reflect your vision.',
    images: [
      { src: '/images/thag.webp', alt: 'Creative agency homepage' },
      { src: '/images/thag1.webp', alt: 'Creative agency services' },
      { src: '/images/thag2.webp', alt: 'Creative agency portfolio' },
    ],
    liveLink: 'https://thajgroup.com/',
    subtitle: 'Interior Design · Creative Studio',
  },
  {
    title: 'VisaLine Company',
    description:
      'Specialized in visa processing and travel support services with speed, accuracy, and complete guidance. We simplify your journey by handling all requirements smoothly and professionally.',
    images: [
      { src: '/images/travel1.webp', alt: 'Creative agency homepage' },
      { src: '/images/travel2.webp', alt: 'Creative agency services' },
      { src: '/images/travel3.webp', alt: 'Creative agency portfolio' },
    ],
    liveLink: 'https://visalinecompany.com/',
    subtitle: 'Travel Services · Visa Support',
  },
  {
    title: 'Teachers Library',
    description:
      'Teachers Library website built using Laravel, designed to help educators access, manage, and share educational resources efficiently, with features like user authentication, content management, and a user-friendly interface.',
    images: [
      { src: '/images/teach.webp', alt: 'Teachers Library website interface' },
      { src: '/images/teach1.webp', alt: 'Teachers Library dashboard' },
      { src: '/images/teach3.webp', alt: 'Teachers Library resources' },
    ],
    liveLink: 'https://my-lib-six.vercel.app/',
    subtitle: 'Laravel · Educational Platform',
  },
  {
    title: 'Arabic Mentors',
    description:
      'A fully integrated Arabic Mentors platform designed to teach the Quran and Arabic language, offering structured courses, interactive lessons, and personalized guidance to help learners of all levels.',
    images: [
      { src: '/images/mentor.webp', alt: 'Bondi portfolio website interface' },
      { src: '/images/mentor2.webp', alt: 'Bondi project showcase' },
      { src: '/images/mentor3.webp', alt: 'Bondi services section' },
    ],
    liveLink: 'https://arabicmentor.net/',
    subtitle: 'e-Learning · Language Mastery',
  },
  {
    title: 'Fazaa',
    description:
      'Fazaa is a technology services company that provides innovative digital solutions to help businesses improve efficiency and performance. It specializes in delivering reliable, scalable, and modern technology tailored to meet diverse client needs.',
    images: [
      { src: '/images/fazaa1.webp', alt: 'Bondi portfolio website interface' },
      { src: '/images/fazza2.png', alt: 'Bondi project showcase' },
      { src: '/images/fazza3.webp', alt: 'Bondi services section' },
    ],
    liveLink: 'https://fazaaonline.com/',
    subtitle: 'Digital Solutions · Tech Services',
  },
  {
    title: 'Educational Consulting',
    description:
      'Educational consulting provides professional guidance to improve teaching methods, learning outcomes, and educational systems. It helps schools, institutions, and individuals make informed decisions to achieve their academic goals.',
    images: [
      { src: '/images/aisha.webp', alt: 'Bondi portfolio website homepage' },
      { src: '/images/aisha1.webp', alt: 'Bondi project showcase' },
      { src: '/images/aisha2.webp', alt: 'Bondi services section' },
    ],
    liveLink: 'https://aichaconsul-1275b09.ingress-erytho.ewp.live/',
    subtitle: 'Educational Consulting · Strategy',
  },
  {
    title: 'Gold Key',
    description:
      'Developed a professional website for Gold Key 24, enabling users to browse and purchase genuine product keys with ease. Integrated instant activation functionality and highlighted lifetime warranty features.',
    images: [
      { src: '/images/gold.webp', alt: 'Portfolio website homepage' },
      { src: '/images/gold1.webp', alt: 'Portfolio projects section' },
      { src: '/images/gold2.png', alt: 'Portfolio contact section' },
    ],
    liveLink: 'https://goldkey24.com/',
    subtitle: 'E-Commerce · Digital Keys',
  },
  {
    title: 'pionksa',
    description:
      'Flower bouquet store built entirely on the Salla e-commerce platform. The store offers a variety of products including premium bouquets, flowers with chocolates, vases, and occasion-based collections.',
    images: [
      { src: '/images/pion1.webp', alt: 'Creative agency homepage' },
      { src: '/images/pion2.webp', alt: 'Creative agency services' },
      { src: '/images/pion3.webp', alt: 'Creative agency portfolio' },
    ],
    liveLink: 'https://pionksa.com/',
    subtitle: 'Salla · Floral E-Commerce',
  },
  {
    title: 'AA EuroVetagro',
    description:
      'The German company AA EuroVetagro, presenting its veterinary services in a clear and modern way. The website features a responsive design and smooth user experience across all devices.',
    images: [
      { src: '/images/vet.webp', alt: 'Portfolio website homepage' },
      { src: '/images/vet1.webp', alt: 'Portfolio projects section' },
      { src: '/images/vet21.webp', alt: 'Portfolio contact section' },
    ],
    liveLink: 'https://aaeurovetagro.de/',
    subtitle: 'Veterinary · German Quality',
  },
  {
    title: 'Alrsaal',
    description:
      'Developed Alrsaal, a Saudi blog showcasing services like WordPress development, SEO optimization, and AI insights. Designed the site to provide informative content and promote digital services effectively.',
    images: [
      { src: '/images/al.webp', alt: 'Portfolio website homepage' },
      { src: '/images/al2.webp', alt: 'Portfolio projects section' },
      { src: '/images/al4.webp', alt: 'Portfolio contact section' },
    ],
    liveLink: 'https://www.alrsaal.com/',
    subtitle: 'WordPress · Blog & Services',
  },
  {
    title: 'Cooperative Optics Association',
    description:
      'Developed a professional website for The Cooperative Optics Association, highlighting their services, products, and industry information. Focused on user-friendly design and clear presentation of optical solutions.',
    images: [
      { src: '/images/gam.webp', alt: 'Portfolio website homepage' },
      { src: '/images/gam1.webp', alt: 'Portfolio projects section' },
      { src: '/images/gam3.webp', alt: 'Portfolio contact section' },
    ],
    liveLink: 'https://cso.sa/',
    subtitle: 'Corporate · Optical Services',
  },
  {
    title: 'Yazeed-lawyer',
    description:
      'Developed a professional website for Yazeed Lawyer, showcasing legal services, expertise, and client support. Designed for easy navigation and clear presentation of legal information.',
    images: [
      { src: '/images/ya.webp', alt: 'Portfolio website homepage' },
      { src: '/images/ya2.webp', alt: 'Portfolio projects section' },
      { src: '/images/ya6.webp', alt: 'Portfolio contact section' },
    ],
    liveLink: 'https://yazeed-lawyer.com',
    subtitle: 'Legal Services · Professional',
  },
  {
    title: 'Wahba VetAgro',
    description:
      'A professional website for Wahba VetAgro, showcasing its veterinary services and products in a clear and user-friendly way. Focused on delivering a responsive UI/UX that works smoothly across all devices.',
    images: [
      { src: '/images/wahba.webp', alt: 'Portfolio website homepage' },
      { src: '/images/wahba1.webp', alt: 'Portfolio projects section' },
      { src: '/images/wahba2.webp', alt: 'Portfolio contact section' },
    ],
    liveLink: 'https://wahbavetagro.com/en',
    subtitle: 'Veterinary · Agricultural',
  },
  {
    title: 'zumurd',
    description:
      'Developed Zumurd, a Jordanian online store specializing in selling prayer beads. Designed the website for easy browsing, product showcase, and seamless shopping experience.',
    images: [
      { src: '/images/za.webp', alt: 'Portfolio website homepage' },
      { src: '/images/za4.webp', alt: 'Portfolio projects section' },
      { src: '/images/za8.webp', alt: 'Portfolio contact section' },
    ],
    liveLink: 'https://zumurd.shop/',
    subtitle: 'E-Commerce · Prayer Beads',
  },
  {
    title: 'Shahnak Cash',
    description:
      'Platform for charging game credits and in-game currency. We provide reliable top-up services for popular games with quick delivery, trusted payment methods, and smooth customer support.',
    images: [
      { src: '/images/ali.webp', alt: 'Portfolio website homepage' },
      { src: '/images/ali3.webp', alt: 'Portfolio projects section' },
      { src: '/images/ali2.webp', alt: 'Portfolio contact section' },
    ],
    liveLink: 'https://s7sh.com/',
    subtitle: 'Gaming · Credits Platform',
  },
  {
    title: 'IEC 360°',
    description:
      'Website for the International Exhibition Fair Saudi Arabia 3rd Edition, showcasing event details, participants, and services in a clear and well-organized way with a smooth user experience.',
    images: [
      { src: '/images/iec.webp', alt: 'Portfolio website homepage' },
      { src: '/images/iec1.png', alt: 'Portfolio projects section' },
      { src: '/images/iec2.webp', alt: 'Portfolio contact section' },
    ],
    liveLink: 'https://umbrella.sa/iec360/en',
    subtitle: 'Events · Exhibition',
  },
]
