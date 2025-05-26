/* eslint-disable no-irregular-whitespace */
import { describe, expect, it } from "vitest"
import { escapeJinjaJson } from "./escapeJinjaJson";

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
    "title": "",
    "leftButton": "back"
  },
  "content": {
    "type": "list",
    "items": [
      {
        "type": "TextLabel",
        "content": {
          "text": "Доступ родителям",
          "typography": "HeadlineMedium",
          "padding": {
            "top": "xl",
            "right": "l",
            "left": "l",
            "bottom": "s"
          }
        }
      },
      {
        "type": "TextLabel",
        "content": {
          "text": "Видят баланс вашего брокерского счёта, историю операций, заявки, состав портфеля и аналитику в своём приложении",
          "typography": "BodyPrimaryMedium",
          "padding": {
            "right": "l",
            "left": "l",
            "bottom": "s"
          }
        }
      },
      {
        "type": "SpacingView",
        "content": {
          "size": "xs"
        }
      },
      {% for parent in parents % }
      {
        "type": "BannerWrapper",
        "content": {
          "padding": {
            "left": "horizontalMargin",
            "right": "horizontalMargin",
            "top": "none"
          },
          "content": {
            "type": "StackWrapper",
            "content": {
              "alignment": "center",
              "axis": "vertical",
              "horizontalAlignment": "center",
              "distribution": "fill",
              "verticalAlignment": "center",
              "children": [
                {
                  "type": "SpacingView",
                  "content": {
                    "size": "m"
                  }
                },
                {
                  "type": "IconView",
                  "content": {
                    "icon": {
                      "name": "{{ parent.icon | default('face_woman') }}"
                    },
                    "shape": "noShape",
                    "size": "large"
                  }
                },
                {
                  "type": "SpacingView",
                  "content": {
                    "size": "m"
                  }
                },
                {
                  "type": "TextLabel",
                  "content": {
                    "text": "{{ parent.name }}"
                  }
                },
                {
                  "type": "SpacingView",
                  "content": {
                    "size": "s"
                  }
                },
                {
                  "type": "TextLabel",
                  "content": {
                    "text": "Имеет доступ",
                    "color": "textPositive",
                    "typography": "BodyPrimarySmall"
                  }
                },
                {
                  "type": "SpacingView",
                  "content": {
                    "size": "l"
                  }
                },
                {
                  "type": "ButtonView",
                  "content": {
                    "text": "Отключить доступ",
                    "style": "secondary",
                    "icon": {
                      "name": "glyph_lock-closed_m"
                    },
                    "action": {
                      "type": "http",
                      "endpoint": "/delete-parent",
                      "method": "post",
                      "body": {
                        "bodyType": "application/json",
                        "values": [
                          {
                            "id": "{{ parent.id }}"
                          }
                        ]
                      },
                      "analytics": {
                        "label": "Disable access",
                        "category": "Parent control",
                        "dimensions": [],
                        "action": "Click",
                        "screen": "List parents"
                      }
                    }
                  }
                },
                {
                  "type": "SpacingView",
                  "content": {
                    "size": "l"
                  }
                }
              ]
            }
          },
          "style": {
            "backgroundColor": "transparent",
            "style": "shadow"
          }
        },
        {
          "type": "SpacingView",
          "content": {
            "size": "xs"
          }
        },
      }
      {% if not loop.last % },
      {% endif % }
      {% endfor % }
    ]
  },
  "footer": {
    "type": "ButtonView",
    "content": {
      "padding": {
        "top": "m",
        "right": "m",
        "left": "m",
        "bottom": "m"
      },
      "text": "Добавить родителя",
      "size": "large",
      "style": "primary",
      "action": {
        "type": "deeplink",
        "url": "/portfolio/parent-control/add-parent",
        "analytics": {
          "label": "Add second parent",
          "category": "Parent control",
          "dimensions": [],
          "action": "Click",
          "screen": "List parents"
        }
      }
    }
  },
  "analytics": {
    "label": "Screen list",
    "category": "Parent control",
    "dimensions": [],
    "action": "Load",
    "screen": "List parents"
  }
}`)).toBe("{\\\"header\\\":{\\\"type\\\":\\\"default\\\",\\\"title\\\":\\\"\\\",\\\"leftButton\\\":\\\"back\\\"},\\\"content\\\":{\\\"type\\\":\\\"list\\\",\\\"items\\\":[{\\\"type\\\":\\\"TextLabel\\\",\\\"content\\\":{\\\"text\\\":\\\"Доступ родителям\\\",\\\"typography\\\":\\\"HeadlineMedium\\\",\\\"padding\\\":{\\\"top\\\":\\\"xl\\\",\\\"right\\\":\\\"l\\\",\\\"left\\\":\\\"l\\\",\\\"bottom\\\":\\\"s\\\"}}},{\\\"type\\\":\\\"TextLabel\\\",\\\"content\\\":{\\\"text\\\":\\\"Видят баланс вашего брокерского счёта, историю операций, заявки, состав портфеля и аналитику в своём приложении\\\",\\\"typography\\\":\\\"BodyPrimaryMedium\\\",\\\"padding\\\":{\\\"right\\\":\\\"l\\\",\\\"left\\\":\\\"l\\\",\\\"bottom\\\":\\\"s\\\"}}},{\\\"type\\\":\\\"SpacingView\\\",\\\"content\\\":{\\\"size\\\":\\\"xs\\\"}},{%forparentinparents%}{\\\"type\\\":\\\"BannerWrapper\\\",\\\"content\\\":{\\\"padding\\\":{\\\"left\\\":\\\"horizontalMargin\\\",\\\"right\\\":\\\"horizontalMargin\\\",\\\"top\\\":\\\"none\\\"},\\\"content\\\":{\\\"type\\\":\\\"StackWrapper\\\",\\\"content\\\":{\\\"alignment\\\":\\\"center\\\",\\\"axis\\\":\\\"vertical\\\",\\\"horizontalAlignment\\\":\\\"center\\\",\\\"distribution\\\":\\\"fill\\\",\\\"verticalAlignment\\\":\\\"center\\\",\\\"children\\\":[{\\\"type\\\":\\\"SpacingView\\\",\\\"content\\\":{\\\"size\\\":\\\"m\\\"}},{\\\"type\\\":\\\"IconView\\\",\\\"content\\\":{\\\"icon\\\":{\\\"name\\\":\\\"{{ parent.icon | default('face_woman') }}\\\"},\\\"shape\\\":\\\"noShape\\\",\\\"size\\\":\\\"large\\\"}},{\\\"type\\\":\\\"SpacingView\\\",\\\"content\\\":{\\\"size\\\":\\\"m\\\"}},{\\\"type\\\":\\\"TextLabel\\\",\\\"content\\\":{\\\"text\\\":\\\"{{ parent.name }}\\\"}},{\\\"type\\\":\\\"SpacingView\\\",\\\"content\\\":{\\\"size\\\":\\\"s\\\"}},{\\\"type\\\":\\\"TextLabel\\\",\\\"content\\\":{\\\"text\\\":\\\"Имеет доступ\\\",\\\"color\\\":\\\"textPositive\\\",\\\"typography\\\":\\\"BodyPrimarySmall\\\"}},{\\\"type\\\":\\\"SpacingView\\\",\\\"content\\\":{\\\"size\\\":\\\"l\\\"}},{\\\"type\\\":\\\"ButtonView\\\",\\\"content\\\":{\\\"text\\\":\\\"Отключить доступ\\\",\\\"style\\\":\\\"secondary\\\",\\\"icon\\\":{\\\"name\\\":\\\"glyph_lock-closed_m\\\"},\\\"action\\\":{\\\"type\\\":\\\"http\\\",\\\"endpoint\\\":\\\"/delete-parent\\\",\\\"method\\\":\\\"post\\\",\\\"body\\\":{\\\"bodyType\\\":\\\"application/json\\\",\\\"values\\\":[{\\\"id\\\":\\\"{{ parent.id }}\\\"}]},\\\"analytics\\\":{\\\"label\\\":\\\"Disable access\\\",\\\"category\\\":\\\"Parent control\\\",\\\"dimensions\\\":[],\\\"action\\\":\\\"Click\\\",\\\"screen\\\":\\\"List parents\\\"}}}},{\\\"type\\\":\\\"SpacingView\\\",\\\"content\\\":{\\\"size\\\":\\\"l\\\"}}]}},\\\"style\\\":{\\\"backgroundColor\\\":\\\"transparent\\\",\\\"style\\\":\\\"shadow\\\"}},{\\\"type\\\":\\\"SpacingView\\\",\\\"content\\\":{\\\"size\\\":\\\"xs\\\"}},}{%ifnotloop.last%},{%endif%}{%endfor%}]},\\\"footer\\\":{\\\"type\\\":\\\"ButtonView\\\",\\\"content\\\":{\\\"padding\\\":{\\\"top\\\":\\\"m\\\",\\\"right\\\":\\\"m\\\",\\\"left\\\":\\\"m\\\",\\\"bottom\\\":\\\"m\\\"},\\\"text\\\":\\\"Добавить родителя\\\",\\\"size\\\":\\\"large\\\",\\\"style\\\":\\\"primary\\\",\\\"action\\\":{\\\"type\\\":\\\"deeplink\\\",\\\"url\\\":\\\"/portfolio/parent-control/add-parent\\\",\\\"analytics\\\":{\\\"label\\\":\\\"Add second parent\\\",\\\"category\\\":\\\"Parent control\\\",\\\"dimensions\\\":[],\\\"action\\\":\\\"Click\\\",\\\"screen\\\":\\\"List parents\\\"}}}},\\\"analytics\\\":{\\\"label\\\":\\\"Screen list\\\",\\\"category\\\":\\\"Parent control\\\",\\\"dimensions\\\":[],\\\"action\\\":\\\"Load\\\",\\\"screen\\\":\\\"List parents\\\"}}"
        )
    })
})