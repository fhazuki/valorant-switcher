import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}

export default {
    theme: {
        extend: {
            zIndex: {
                '999': '999',
            },
        },
    },
};
