import { expect, test } from "vitest";
import { changeLanguage } from "./util";

// util.js에 대한 테스트 코드
test("현재 영어가 번역할 언어이고 한국어가 번역될 언어인 경우, 번역할 언어가 한국어가 되면 자동으로 번역될 언어가 영어로 바뀐다.", ()=>{
    const expected = "en";
    const sourceLanguage = "ko";
    const targetLanguage = "ko";

    const result = changeLanguage(sourceLanguage, targetLanguage);

    expect(result).toBe(expected);
})