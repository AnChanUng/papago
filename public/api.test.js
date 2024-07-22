// 테스트코드 작성 파일 규칙 -> { 테스트할 파일명.test.js }
import { test, expect } from "vitest"; // vitest 라이브러리에서 test 함수 import
import { detectLanguage, translateLanguage } from "./api";

// test('테스트 케이스 시나리오를 작성, 보통 문장으로 작성', 실행시킬 테스트 코드);
// 테스트는 기본적으로 가설에 대한 검증
test('"안녕"이라고 작성할 경우, 한국어로 감지된다.', async () => {
    // 내가 기대하는 결과값(expected) 데이터를 준비
    const expected = 'ko';
    const text = '안녕';
    const url = 'http://localhost:3000/detect';
    
    const result = await detectLanguage(url, text);

    expect(result).toBe(expected);    
});

// ???
test("'hello'라고 작성할 경우 영우(en)로 감지된다.", async () => {
    const expected = 'en';
    const text = 'hello';
    const url = 'http://localhost:3000/detect';

    const result = await detectLanguage(url, text);
});

// ???
test('"안녕"을 번역할 경우, "Hi."로 번역된다.', async () => {
    const expected = 'Hi.';
    const sourceLanugage = 'ko';
    const text = '안녕';
    const targetLanguage = 'en';
    
    const result = await translateLanguage(sourceLanugage, targetLanguage, text);
    
    expect(result).toBe(expected);  
});



// 1. hello, 안녕 테스트 완성
// 2. 다른 테스트 케이스??
// 3. 테스트 했으니까 app.js에서 api.js를 써야겠네?
// 우리는 기존 함수에서 화면에 그리는 로직을 제거했기 때문에
// 화면 그리는 로직 처리를 어딘가에 다시 추가해서 완성