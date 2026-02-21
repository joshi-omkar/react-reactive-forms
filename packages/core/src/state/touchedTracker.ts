import { AbstractControl } from '../abstract/AbstractControl'

export interface TouchedState {
  touched: boolean
  untouched: boolean
}

export function createTouchedTracker(
  control: AbstractControl<any>
): TouchedState {
  const state: TouchedState = {
    touched: false,
    untouched: true,
  }

  const compute = () => {
    if ('controls' in control && Array.isArray((control as any).controls)) {
      state.touched = (control as any).controls.some((c: any) => c.touched)
    } else if ('controls' in control) {
      state.touched = Object.values((control as any).controls).some(
        (c: any) => c.touched
      )
    } else {
      state.touched = control.touched
    }

    state.untouched = !state.touched
  }

  control.subscribe(compute)
  compute()

  return state
}
