// selectors.js
export const selectAllChallengeClashes = (state) => state.challengeClashes.clashes;
export const selectChallengeClashLoading = (state) => state.challengeClashes.loading;
export const selectChallengeClashError = (state) => state.challengeClashes.error;
export const selectLastVisibleClash = (state) => state.challengeClashes.lastVisible;
