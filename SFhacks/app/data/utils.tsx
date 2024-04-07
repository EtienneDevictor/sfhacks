export function scanOptions(text: string) {
  const firstOption = new RegExp(/1[\.\)][^.?!]+[.?!]/);
  const secondOption = new RegExp(/2[\.\)][^.?!]+[.?!]/);
  const thirdOption = new RegExp(/3[\.\)][^.?!]+[.?!]/);
  const option1 = text.match(firstOption);
  const option2 = text.match(secondOption);
  const option3 = text.match(thirdOption);
  return {
    options: [
      option1 ? option1[0] : "",
      option2 ? option2[0] : "",
      option3 ? option3[0] : "",
    ],
    index: text.indexOf(option1 ? option1[0] : ""),
  };
}
