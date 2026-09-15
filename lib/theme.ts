export type Theme = 'day' | 'night';
export type ThemeMode = 'auto' | Theme;
export function themeAtHour(hour: number): Theme { return hour >= 7 && hour < 19 ? 'day' : 'night'; }
export function resolveTheme(mode: ThemeMode, hour = new Date().getHours()): Theme { return mode === 'auto' ? themeAtHour(hour) : mode; }
export const themeBoot = `(function(){var m='auto';try{var s=localStorage.getItem('abeniy-theme');if(s==='day'||s==='night')m=s}catch(e){}var h=new Date().getHours();document.documentElement.dataset.theme=m==='auto'?(h>=7&&h<19?'day':'night'):m;document.documentElement.dataset.mode=m})()`;
