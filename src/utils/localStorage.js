export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('lr-state', serializedState);
  } catch {
    // ignore write errors
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('lr-state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
