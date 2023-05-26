import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeHtmlPipe();
    expect(pipe).toBeTruthy();
  });

  it('should text in the format', () => {
    const text = 'First \n value';

    const pipe = new SafeHtmlPipe();

    const result = pipe.transform(text);
    expect(result).toEqual('First <br/> value');
  });
});
