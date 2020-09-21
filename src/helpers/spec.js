import { toState } from "./color";
import { render } from "./checkboard";
import "jest-canvas-mock";

test('toState hsl', () => {
    let result = toState({h:100, s:100, l:90}, 90);
    expect(result.hsl.h).toBe(100);
    expect(result.hsl.s).toBe(1);
    expect(result.hsl.l).toBe(0.9);
    expect(result.hsl.a).toBe(1);   

    result = toState({h:98, s:0.2, l:0.9, a:0.5}, 90);
    expect(parseInt(result.hsl.h)).toBe(98);
    expect(result.hsl.s.toFixed(1)).toBe("0.2");
    expect(result.hsl.l.toFixed(1)).toBe("0.9");
    expect(result.hsl.a).toBe(0.5);  
})


test('checkboard canvas', () => {
    const mockCanvas = () => (
        { getContext:() => ''}
    );
    let result = render('transparent', 'rgba(0,0,0,.08)', 8, mockCanvas);
    expect(result).toBe(null); 

    global.document = undefined;
    window.document = undefined;
    result = render('transparent', 'rgba(0,0,0,.08)', 8, mockCanvas);
    expect(result).toBe(null); 
})