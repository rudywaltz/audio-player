
function pad (string, ...keys) {
  let res = string[0]
  for (let index = 0; index < keys.length; index++) {
    res +=  String(keys[index]).padStart(2, '0') + string[index +1]
  }

  return res
}

function displayLength(time) {
  if (isNaN(time) || time === null) return '--:--:--';
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.ceil(time % 60);
  return pad`${hours}:${minutes}:${seconds}`;
}


export { displayLength }
