/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#042541',
        gradientGreen: '#8dcea2',
        gradientBlue: '#05b4e5',
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(at 30% top, #073d3f 0%, #042541 70%)',
        'account-pipes':
          "url('https://www.themoviedb.org/assets/2/v4/account_pipes/teal-2b30e621b46abc5f5c1c192b0adfbf81793a9f082d749fc3d20047a4ef10c27f.svg')",
      },
    },
  },
  plugins: [],
};
