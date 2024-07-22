console.log('test');

const [sourceSelect, targetSelect] = document.getElementsByTagName('select');
const [sourceTextArea, targetTextArea] = document.getElementsByTagName('textarea');

let targetLanguage = 'en';
targetSelect.addEventListener('change', (event) => targetLanguage = event.target.value);

let timer;
sourceTextArea.addEventListener('input', (event) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(async () => {
        const text = event.target.value;
        const result = await detectLanguage(text);
        translateLanguage(result, text);
    }, 1500);
    
});

// 언어 감지 요청 기능을 수행하는 함수
const detectLanguage = async (text) => {
    let sourceLanguage; // 감지된 언어값(반환 값으로 활용)

    const url = '/detect';

    const options = { // fetch 요청 전송 시 사용할 요청 정보들을 모아둔 객체
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: text })
    };

    await fetch(url, options)
    .then(response => response.json())
    .then(data => {
        sourceLanguage = data.langCode;
        sourceSelect.value = sourceLanguage;
    });

    return sourceLanguage;
}

// 언어 번역 요청 기능을 수행하는 함수
const translateLanguage = async (sourceLanguage, text) => {
    const url = '/translate';

    const body = {
        source: sourceLanguage,
        target: targetLanguage,
        text, // text: text와 같음
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    await fetch(url, options)
    .then(response => response.json())
    .then(data => {
        const result = data.message.result;

        // 파파고 화면에 출력하는 부분
        targetTextArea.value = result.translatedText;
        targetSelect.value = result.tarLangType;
    })
}