var todo = (function() {
    var mode = 'html'; // mode 설정
    var tasks = [];
    var STATE_P = '진행';
    var STATE_C = '완료';
    var addTask = (function(title) {
        var id = 0;

        return function(title) {
            var result = id;

            tasks.push({
                title: title,
                id: id++,
                state: STATE_P
            });

            render();

            return result;
        };

    })();

    var removeTask = function(id) {
        // id 가 유효한지 판단하기 위해서는 scope 범위 안에서 변수로 상태를 만들어서 관리해라!!!
        var isRemoved = false;

        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                tasks.splice(i, 1);
                isRemoved = true;
                break;
            }
        }

        if (!isRemoved) warnning('removeTask: invalid id');
        render();
    };

    var changeState = function(id, state) {
        // sheild pattern 유효성 검사하기
        // id validator
        // white list : 유효성검사를 통과한 사용 가능한 데이터 
        var ID = false,
            STATE;
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                ID = id;
                break;
            }
        }
        if (ID === false) {
            warnning('changeState: invalid id - ' + id);
        }

        STATE = state;

        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === ID) {
                tasks[i].state = STATE;

                break;
            }
        }

        render();
    };

    var warnning = console.log();

    var init, render;

    (function() {
        var completeLi, progressLi;

        init = (function() {
            var initHtml = function() {
                progressLi = document.querySelector('#todo .progress li');
                completeLi = document.querySelector('#todo .complete li');

                progressLi.parentNode.removeChild(progressLi);
                completeLi.parentNode.removeChild(completeLi);
            };

            return function() {
                if (mode === 'html') {
                    initHtml();
                }
            };
        })();

        render = (function() {
            // 다른 영역에서 알필요가 없는 함수들은 은닉한다. 알필요가 없는 것들은 은닉해주는게 맞다.
            // renderConsole, renderHtml 상위 영역에서 몰라야 한다. 

            var renderConsole = function() {
                console.log('완료!');
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i].state === '진행') {}
                    console.log(tasks[i].id + ', ' + tasks[i].title + ', ' + tasks[i].state);
                }
                console.log('추가 : add(할일 내용)');
                console.log('삭제 : remove(아이디)');
                console.log('상태 변경 : toggle(아이디, 상테 - 완료 또는 진행)');
            };

            var renderHtml = function() {
                console.log('// 각 리스트를 비운다.');
                document.querySelectorAll('#todo .progress').innerHTML = '';
                document.querySelectorAll('#todo .complete').innerHTML = '';
                console.log('// 진행을 채운다.');
                console.log(tasks);
                console.log('// 완료를 채운다.');
                console.log('// 인풋 박스를 비운다.');
                document.querySelector('#todo form input').value = '';
            };

            return function() {
                if (mode === 'console') {
                    renderConsole();
                } else if (mode === 'html') {
                    renderHtml();
                }
            };

        })();
    })();


    render();

    // 캡슐화 == 은닉 (즉시실행함수, 함수의 스코프를 이용해서 랩핑함, 꼭 즉시 실행 함수는 아니여도 될듯)
    // 노출화하기 위해선 객체의 속성 값을 리턴해서 노출함
    return {
        init: init,
        modeHtml: function() {
            mode = 'html';
        },
        modeConsole: function() {
            mode = 'console';
        },
        add: addTask,
        remove: removeTask,
        toggle: function(id) {
            for (var i = 0; i < tasks.length; i++) {
                // validator state
                if (tasks[i].id === id) {
                    var state = tasks[i].state;
                    if (state === STATE_P) {
                        changeState(id, STATE_C);
                    } else {
                        changeState(id, STATE_P);
                    }

                    break;
                }
            }
        }
    };

})();

todo.init();