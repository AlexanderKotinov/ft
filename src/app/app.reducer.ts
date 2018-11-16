uiimport * as fromUi from './shared/ui.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";
import {createFeatureReducerFactory} from "@ngrx/store/src/utils";

export interface State {
  ui: fromUi.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoadin = createSelector(getUiState, fromUi.getIsLoading);
