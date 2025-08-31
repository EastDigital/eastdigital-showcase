import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				lg: '2rem',
				xl: '3rem',
			},
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				nunito: ['Nunito Sans', 'sans-serif'],
			},
			fontSize: {
				// Mobile-first typography scale
				'mobile-xs': ['0.75rem', { lineHeight: '1.5' }],    // 12px
				'mobile-sm': ['0.875rem', { lineHeight: '1.5' }],   // 14px  
				'mobile-base': ['1rem', { lineHeight: '1.6' }],     // 16px
				'mobile-lg': ['1.125rem', { lineHeight: '1.5' }],   // 18px
				'mobile-xl': ['1.25rem', { lineHeight: '1.4' }],    // 20px
				'mobile-2xl': ['1.5rem', { lineHeight: '1.3' }],    // 24px
				'mobile-3xl': ['1.875rem', { lineHeight: '1.2' }],  // 30px
				'mobile-4xl': ['2.25rem', { lineHeight: '1.1' }],   // 36px
				// Responsive text sizes
				'responsive-xs': ['clamp(0.75rem, 0.9vw, 0.875rem)', { lineHeight: '1.5' }],
				'responsive-sm': ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.5' }],
				'responsive-base': ['clamp(1rem, 1.2vw, 1.125rem)', { lineHeight: '1.6' }],
				'responsive-lg': ['clamp(1.125rem, 1.4vw, 1.25rem)', { lineHeight: '1.5' }],
				'responsive-xl': ['clamp(1.25rem, 1.6vw, 1.5rem)', { lineHeight: '1.4' }],
				'responsive-2xl': ['clamp(1.5rem, 2vw, 2rem)', { lineHeight: '1.3' }],
				'responsive-3xl': ['clamp(1.875rem, 2.5vw, 2.5rem)', { lineHeight: '1.2' }],
				'responsive-4xl': ['clamp(2.25rem, 3vw, 3.5rem)', { lineHeight: '1.1' }],
			},
			spacing: {
				// Touch-friendly spacing
				'touch': '44px',     // Minimum touch target
				'touch-lg': '56px',  // Large touch target
				'touch-xl': '64px',  // Extra large touch target
				// Design system spacing scale
				'xs': 'var(--space-xs)',    // 4px
				'sm': 'var(--space-sm)',    // 8px
				'md': 'var(--space-md)',    // 16px
				'lg': 'var(--space-lg)',    // 24px
				'xl': 'var(--space-xl)',    // 32px
				'2xl': 'var(--space-2xl)',  // 48px
				'3xl': 'var(--space-3xl)',  // 64px
				// Section spacing
				'section': 'var(--section-padding)',  // 2rem
				'section-gap': 'var(--section-gap)',  // 3rem
			},
			maxWidth: {
				'content': 'var(--content-width)',  // 1200px
				'prose': '65ch',  // Optimal reading width
				'narrow': '40ch', // Narrow content
				'wide': '80ch',   // Wide content
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Brand colors from design system
				glass: {
					DEFAULT: 'hsl(var(--glass-bg))',
					border: 'hsl(var(--glass-border))',
					light: 'hsl(var(--glass-light-bg))',
					'light-border': 'hsl(var(--glass-light-border))',
				},
				orange: {
					glow: 'hsl(var(--orange-glow))',
				},
				cream: 'hsl(var(--cream))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'touch': '8px',  // Touch-friendly radius
			},
			keyframes: {
				// Accordion animations
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				// Fade animations
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(20px)' }
				},
				// Scale animations
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0.95)', opacity: '0' }
				},
				// Slide animations
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				// CTA gradient flow
				'cta-gradient-flow': {
					'0%': { backgroundPosition: '0% 50%' },
					'100%': { backgroundPosition: '100% 50%' }
				},
				// Hover lift
				'hover-lift': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-2px)' }
				}
			},
			animation: {
				// Basic animations
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-up': 'fade-in-up 0.8s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				// Interactive animations
				'hover-lift': 'hover-lift 0.2s ease',
				'cta-flow': 'cta-gradient-flow 4s linear infinite',
				// Staggered animations
				'stagger-1': 'fade-in-up 0.8s ease-out 0.1s both',
				'stagger-2': 'fade-in-up 0.8s ease-out 0.2s both',
				'stagger-3': 'fade-in-up 0.8s ease-out 0.3s both',
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-glass': 'var(--gradient-glass)',
			},
			backdropBlur: {
				'glass': '12px',
			},
			boxShadow: {
				'touch': '0 2px 8px hsl(var(--foreground) / 0.1)',
				'touch-lg': '0 4px 12px hsl(var(--primary) / 0.4)',
				'elevated': '0 8px 25px hsl(var(--foreground) / 0.15)',
				'glow': '0 0 20px hsl(var(--primary) / 0.5)',
				'cta': '0 8px 25px -8px hsl(var(--primary) / 0.5)',
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
