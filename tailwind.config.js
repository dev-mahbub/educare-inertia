import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                'primary': ["'Inter', sans-serif"],
            },
            colors: {
                'white': '#ffffff',
                'primary': '#0B52BD',
                'dark': '#062C66',
                'border': '#C3CCD9',
                'borderLight': '#8794A8',
                'heading': '#142133',
                'headingLight': '#505E73',
                'headingLightest': '#858E9D',
                'lightest': '#E6EDF8',
                'light': '#E6EEFA',
                'grayLight': '#9BABC2',
                'supportingA': '#589BE7',
                'supportingB': '#F78359',
                'supportingC': '#FDBC58',
                'supportingD': '#17B243',
                'supportingE': '#73DCF4',
                'info': '#589BE7',
                'danger': '#F30445',
                'success': '#16AB40',
                'warning': '#F78359',
            },
        },
        screens: {
            'xs': '320px',
            // => @media (min-width: 320px) { ... }
      
            'sm': '576px',
            // => @media (min-width: 576px) { ... }
      
            'md': '768px',
            // => @media (min-width: 768px) { ... }
      
            'lg': '992px',
            // => @media (min-width: 992px) { ... }
      
            'xl': '1201px',
            // => @media (min-width: 1200px) { ... }
      
            'xxl': '1401px',
            // => @media (min-width: 1400px) { ... }
      
            'xxxl': '1601px',
            // => @media (min-width: 1601px) { ... }

            '4xl': '1801px',
            // => @media (min-width: 1601px) { ... }


            'max3Xl': {'max': '1800px'},
            // => @media (max-width: 1700px) { ... }
      
            'max2Xl': {'max': '1600px'},
            // => @media (max-width: 1600px) { ... }
      
            'maxXl': {'max': '1400px'},
            // => @media (max-width: 1200px) { ... }
      
            'maxLg': {'max': '1200px'},
            // => @media (max-width: 1200px) { ... }
      
            'maxMd': {'max': '991px'},
            // => @media (max-width: 991px) { ... }
      
            'maxSm': {'max': '767px'},
            // => @media (max-width: 767px) { ... }
      
            'maxXs': {'max': '575px'},
            // => @media (max-width: 575px) { ... }
      
      
            'minMax4Xl': {'min': '1801px', 'max': '1900px'},
            // => @media (min-width: 1601px) and (max-width: 1800px) { ... }
            'minMax3Xl': {'min': '1601px', 'max': '1800px'},
            // => @media (min-width: 1601px) and (max-width: 1800px) { ... }
      
            'minMax2Xl': {'min': '1401px', 'max': '1600px'},
            // => @media (min-width: 1401px) and (max-width: 1600px) { ... }
      
            'minMaxXl': {'min': '1201px', 'max': '1400px'},
            // => @media (min-width: 1201px) and (max-width: 1400px) { ... }
      
            'minMaxLg': {'min': '992px', 'max': '1200px'},
            // => @media (min-width: 992px) and (max-width: 1200px) { ... }
      
            'minMaxMd': {'min': '768px', 'max': '991px'},
            // => @media (min-width: 768px) and (max-width: 991px) { ... }
      
            'minMaxSm': {'min': '576px', 'max': '767px'},
            // => @media (min-width: 576px) and (max-width: 576px) { ... }
        },
    },

    plugins: [forms],
};
