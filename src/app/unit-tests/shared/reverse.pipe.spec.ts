import { ReversePipe } from "./reverse.pipe";

// this is isolated (does not depend on Angular testing utilities)
describe('UserComponent', () => {
  it('should run the reverse pipe correctly', () => {
    let reversePipe = new ReversePipe();
    expect(reversePipe.transform('equal')).toEqual('lauqe');
  });
});
