// cookieUtils.ts

/**
 * 지정된 시간(분) 동안 유효한 쿠키를 설정합니다.
 * @param name 쿠키의 이름
 * @param value 쿠키의 값
 * @param minutes 쿠키의 만료 시간 (분 단위)
 */
export const setCookie = (name: string, value: string, minutes: number): void => {
  const date = new Date();
  date.setTime(date.getTime() + (minutes * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

/**
 * 이름으로 쿠키 값을 가져옵니다.
 * @param name 가져올 쿠키의 이름
 * @returns 쿠키의 값 (존재하지 않으면 빈 문자열)
 */
export const getCookie = (name: string): string => {
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cookieName) === 0) {
      return c.substring(cookieName.length, c.length);
    }
  }
  return '';
};

/**
 * 지정된 쿠키를 삭제합니다.
 * @param name 삭제할 쿠키의 이름
 */
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};