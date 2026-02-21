import { AbstractControl } from '../abstract/AbstractControl'

export interface DirtyState {
  dirty: boolean
  pristine: boolean
}

export function createDirtyTracker(
  control: AbstractControl<any>
): DirtyState {
  const state: DirtyState = {
    dirty: false,
    pristine: true,
  }

  const compute = () => {
    if ('controls' in control && Array.isArray((control as any).controls)) {
      // FormArray
      state.dirty = (control as any).controls.some((c: any) => c.dirty)
    } else if ('controls' in control) {
      // FormGroup
      state.dirty = Object.values((control as any).controls).some(
        (c: any) => c.dirty
      )
    } else {
      // FormControl
      state.dirty = control.dirty
    }

    state.pristine = !state.dirty
  }

  control.subscribe(compute)
  compute()

  return state
}
