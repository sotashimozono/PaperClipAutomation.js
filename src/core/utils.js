export const safeClick = (id) => {
    const el = document.getElementById(id);
    if (el && !el.disabled && el.style.display !== 'none') {
        el.click();
        return true;
    }
    return false;
};

export const getValSafe = (id) => {
    const el = document.getElementById(id);
    if (!el) return null;
    return parseInt(el.innerText.replace(/[^0-9.]/g, '')) || 0;
};

export const getFundsSafe = () => {
    const el = document.getElementById('funds');
    if (!el) return 0;
    return parseFloat(el.innerText.replace('$', ''));
};

export const sleep = ms => new Promise(res => setTimeout(res, ms));