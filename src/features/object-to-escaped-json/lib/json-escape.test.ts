/* eslint-disable no-irregular-whitespace */
import { describe, expect, it } from "vitest"

import { escapeJinjaJson, escapeJson, unescapeJson } from "./json-escape"

describe("escapeJson", () => {
    it("должен экранировать кавычки", () => {
        expect(escapeJson('{"key": "value"}')).toBe('{\\"key\\": \\"value\\"}')
    })

    it("должен сохранять экранированные \\n", () => {
        expect(escapeJson('{"key": "value\\nnext line\\tTab"}')).toBe(
            '{\\"key\\": \\"value\\nnext line\\tTab\\"}',
        )
    })

    it("должен удалять реальные переносы строк и табуляции", () => {
        expect(escapeJson('{\n\t"key": "value"\n}')).toBe(
            '{\\"key\\": \\"value\\"}',
        )
    })

    it("должен удалять лишние пробелы", () => {
        expect(escapeJson('{"key":    "value"    }')).toBe(
            '{\\"key\\": \\"value\\"}',
        )
    })
})

describe("unescapeJson", () => {
    it("должен раскрывать экранированные кавычки", () => {
        expect(unescapeJson('{\\"key\\": \\"value\\"}')).toBe('{"key": "value"}')
    })

    it("должен преобразовывать \\n в перенос строки", () => {
        expect(unescapeJson('{\\"key\\": \\"value\\nnext line\\"}')).toBe(
            '{"key": "value\nnext line"}',
        )
    })
})

describe("escapeJinjaJson", () => {
    it("должен экранировать двойные кавычки", () => {
        expect(escapeJinjaJson('{"key": "value"}')).toBe(
            '{\\"key\\":\\"value\\"}'
        );
    });

    it("должен сохранять явные переносы строк", () => {
        expect(escapeJinjaJson('{"key": "value\\nnext line"}')).toBe(
            '{\\"key\\":\\"value\\nnext line\\"}'
        );
    });

    it("должен удалять неявные переносы строк", () => {
        expect(escapeJinjaJson('{"key": "value"\n  \t  }')).toBe(
            '{\\"key\\":\\"value\\"}'
        );
    });

    it("должен удалять повторяющиеся пробелы вне кавычек", () => {
        expect(escapeJinjaJson('{"key"     :      "value"    }')).toBe(
            '{\\"key\\":\\"value\\"}'
        );
    });

    it("должен корректно работать с Jinja-вставками без их экранирования", () => {
        expect(escapeJinjaJson('{"key": "{{ value }}"}')).toBe(
            '{\\"key\\":\\"{{ value }}\\"}'
        );
        expect(escapeJinjaJson('{"key": "{% if condition %}"}')).toBe(
            '{\\"key\\":\\"{% if condition %}\\"}'
        );
    });

    it("должен удалять пробел, если за ним идет непробельный символ", () => {
        expect(escapeJinjaJson('{"key"    :"value"}')).toBe(
            '{\\"key\\":\\"value\\"}'
        );
    });
});

describe("escapeJinjaJson - сложный случай", () => {
    it("должен экранировать Jinja теги в большом количестве", () => {
        expect(escapeJinjaJson(`{
    "header": {
        "type": "default",
        "title": ""
    },
    "content": {
        "type": "list",
        "items": [
            {
                "type": "SpacingView",
                "content": {
                    "size": "xl6"
                }
            },
            {
                "type": "SpacingView",
                "content": {
                    "size": "xl6"
                }
            },
            {
                "type": "SpacingView",
                "content": {
                    "size": "xl6"
                }
            },
            {
                "type": "StackWrapper",
                "content": {
                    "axis": "horizontal",
                    "horizontalAlignment": "center",
                    "padding": {
                        "top": "xl",
                        "left": "s",
                        "right": "s"
                    },
                    "children": [
                        {
                            "type": "IconView",
                            "content": {
                                "icon": {
                                    "name": "object_party-popper"
                                },
                                "size": "xLarge",
                                "shape": "noShape"
                            }
                        }
                    ]
                }
            },
            {
                "type": "TextLabel",
                "content": {
                    "text": "Теперь у родителя есть доступ к счёту",
                    "color": "textPrimary",
                    "typography": "HeadlineLarge",
                    "horizontalLayout": "fill",
                    "alignment": "center",
                    "padding": {
                        "top": "xl",
                        "bottom": "s",
                        "left": "horizontalMargin",
                        "right": "horizontalMargin"
                    }
                }
            },
            {
                "type": "TextLabel",
                "content": {
                    "text": "Отключить доступ можно в настройках портфеля",
                    "color": "textPrimary",
                    "typography": "BodyPrimaryMedium",
                    "horizontalLayout": "fill",
                    "alignment": "center",
                    "lineLimit": 2,
                    "padding": {
                        "bottom": "s",
                        "left": "horizontalMargin",
                        "right": "horizontalMargin"
                    }
                }
            }
        ]
    },
    "footer": {
        "type": "StackWrapper",
        "content": {
            "axis": "vertical",
            "padding": {
                "top": "m",
                "left": "s",
                "bottom": "m",
                "right": "s"
            },
            "children": [
                {% if not is_full_parent_access %
                }
        {
                    "type": "ButtonView",
                    "content": {
                        "text": "Добавить второго родителя",
                        "size": "large",
                        "style": "primary",
                        "action": {
                            "type": "deeplink",
                            "url": "/portfolio/parent-control/add-parent"
                        }
                    }
                },
                {
                    "type": "SpacingView",
                    "content": {
                        "size": "m"
                    }
                },
                {% endif %
                }
        {
                    "type": "ButtonView",
                    "content": {
                        "text": "На главный",
                        "size": "large",
                        "style": "secondary",
                        "action": {
                            "type": "event",
                            "eventType": "close"
                        }
                    }
                }
            ]
        }
    }
}`)).toBe("{\"header\":{\"type\":\"default\",\"title\":\"\",\"leftButton\":\"back\"},\"content\":{\"type\":\"list\",\"items\":[{\"type\":\"TextLabel\",\"content\":{\"text\":\"Доступ родителям\",\"typography\":\"HeadlineMedium\",\"padding\":{\"top\":\"xl\",\"right\":\"l\",\"left\":\"l\",\"bottom\":\"s\"}}},{\"type\":\"TextLabel\",\"content\":{\"text\":\"Видят баланс вашего брокерского счёта, историю операций, заявки, состав портфеля и аналитику в своём приложении\",\"typography\":\"BodyPrimaryMedium\",\"padding\":{\"right\":\"l\",\"left\":\"l\",\"bottom\":\"s\"}}},{\"type\":\"SpacingView\",\"content\":{\"size\":\"xs\"}},{%forparentinparents%}{\"type\":\"BannerWrapper\",\"content\":{\"padding\":{\"left\":\"horizontalMargin\",\"right\":\"horizontalMargin\",\"top\":\"none\"},\"content\":{\"type\":\"StackWrapper\",\"content\":{\"alignment\":\"center\",\"axis\":\"vertical\",\"horizontalAlignment\":\"center\",\"distribution\":\"fill\",\"verticalAlignment\":\"center\",\"children\":[{\"type\":\"SpacingView\",\"content\":{\"size\":\"m\"}},{\"type\":\"IconView\",\"content\":{\"icon\":{\"name\":\"{{ parent.icon | default('face_woman') }}\"},\"shape\":\"noShape\",\"size\":\"large\"}},{\"type\":\"SpacingView\",\"content\":{\"size\":\"m\"}},{\"type\":\"TextLabel\",\"content\":{\"text\":\"{{ parent.name }}\"}},{\"type\":\"SpacingView\",\"content\":{\"size\":\"s\"}},{\"type\":\"TextLabel\",\"content\":{\"text\":\"Имеет доступ\",\"color\":\"textPositive\",\"typography\":\"BodyPrimarySmall\"}},{\"type\":\"SpacingView\",\"content\":{\"size\":\"l\"}},{\"type\":\"ButtonView\",\"content\":{\"text\":\"Отключить доступ\",\"style\":\"secondary\",\"icon\":{\"name\":\"glyph_lock-closed_m\"},\"action\":{\"type\":\"http\",\"endpoint\":\"/delete-parent\",\"method\":\"post\",\"body\":{\"bodyType\":\"application/json\",\"values\":[{\"id\":\"{{ parent.id }}\"}]},\"analytics\":{\"label\":\"Disable access\",\"category\":\"Parent control\",\"dimensions\":[],\"action\":\"Click\",\"screen\":\"List parents\"}}}},{\"type\":\"SpacingView\",\"content\":{\"size\":\"l\"}}]}},\"style\":{\"backgroundColor\":\"transparent\",\"style\":\"shadow\"}},{\"type\":\"SpacingView\",\"content\":{\"size\":\"xs\"}},}{%ifnotloop.last%},{%endif%}{%endfor%}]},\"footer\":{\"type\":\"ButtonView\",\"content\":{\"padding\":{\"top\":\"m\",\"right\":\"m\",\"left\":\"m\",\"bottom\":\"m\"},\"text\":\"Добавить родителя\",\"size\":\"large\",\"style\":\"primary\",\"action\":{\"type\":\"deeplink\",\"url\":\"/portfolio/parent-control/add-parent\",\"analytics\":{\"label\":\"Add second parent\",\"category\":\"Parent control\",\"dimensions\":[],\"action\":\"Click\",\"screen\":\"List parents\"}}}},\"analytics\":{\"label\":\"Screen list\",\"category\":\"Parent control\",\"dimensions\":[],\"action\":\"Load\",\"screen\":\"List parents\"}}"
        )
    })
})