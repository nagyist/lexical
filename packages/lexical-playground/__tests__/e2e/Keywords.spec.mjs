/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  assertHTML,
  assertSelection,
  focusEditor,
  initialize,
  keyDownCtrlOrAlt,
  keyDownCtrlOrMeta,
  keyUpCtrlOrAlt,
  keyUpCtrlOrMeta,
  repeat,
  test,
  waitForSelector,
} from '../utils/index.mjs';

test.describe('Keywords', () => {
  test.beforeEach(({isCollab, page}) => initialize({isCollab, page}));
  test(`Can create a decorator and move selection around it`, async ({
    page,
    browserName,
  }) => {
    await focusEditor(page);
    await page.keyboard.type('congrats');

    await waitForSelector(page, '.keyword');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span></p>',
    );
    await assertSelection(page, {
      anchorOffset: 8,
      anchorPath: [0, 0, 0],
      focusOffset: 8,
      focusPath: [0, 0, 0],
    });

    await page.keyboard.type('c');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><span data-lexical-text="true">congratsc</span></p>',
    );
    await assertSelection(page, {
      anchorOffset: 9,
      anchorPath: [0, 0, 0],
      focusOffset: 9,
      focusPath: [0, 0, 0],
    });

    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Space');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span><span data-lexical-text="true"> c</span></p>',
    );
    await assertSelection(page, {
      anchorOffset: 1,
      anchorPath: [0, 1, 0],
      focusOffset: 1,
      focusPath: [0, 1, 0],
    });

    await page.keyboard.press('ArrowRight');
    await page.keyboard.type('ongrats');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span><span data-lexical-text="true"> </span><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span></p>',
    );
    await assertSelection(page, {
      anchorOffset: 8,
      anchorPath: [0, 2, 0],
      focusOffset: 8,
      focusPath: [0, 2, 0],
    });

    await repeat(8, async () => {
      await page.keyboard.press('ArrowLeft');
    });
    if (browserName === 'firefox') {
      await assertSelection(page, {
        anchorOffset: 0,
        anchorPath: [0, 2, 0],
        focusOffset: 0,
        focusPath: [0, 2, 0],
      });
    } else {
      await assertSelection(page, {
        anchorOffset: 1,
        anchorPath: [0, 1, 0],
        focusOffset: 1,
        focusPath: [0, 1, 0],
      });
    }

    await page.keyboard.press('Backspace');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><span data-lexical-text="true">congratscongrats</span></p>',
    );
    await assertSelection(page, {
      anchorOffset: 8,
      anchorPath: [0, 0, 0],
      focusOffset: 8,
      focusPath: [0, 0, 0],
    });

    await page.keyboard.press('Space');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span><span data-lexical-text="true"> </span><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span></p>',
    );
    await assertSelection(page, {
      anchorOffset: 1,
      anchorPath: [0, 1, 0],
      focusOffset: 1,
      focusPath: [0, 1, 0],
    });
  });

  test('Can type congrats[Team]!', async ({page}) => {
    await focusEditor(page);
    await page.keyboard.type('congrats[Team]!');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span><span data-lexical-text="true">[Team]!</span></p>',
    );

    await assertSelection(page, {
      anchorOffset: 7,
      anchorPath: [0, 1, 0],
      focusOffset: 7,
      focusPath: [0, 1, 0],
    });
  });

  test('Can type "congrats Bob!" where " Bob!" is bold', async ({
    page,
    browserName,
    isCollab,
    isPlainText,
  }) => {
    test.skip(isPlainText);
    await focusEditor(page);
    await page.keyboard.type('congrats');

    await waitForSelector(page, '.keyword');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span></p>',
    );
    await assertSelection(page, {
      anchorOffset: 8,
      anchorPath: [0, 0, 0],
      focusOffset: 8,
      focusPath: [0, 0, 0],
    });

    await keyDownCtrlOrMeta(page);
    await page.keyboard.press('b');
    await keyUpCtrlOrMeta(page);

    await page.keyboard.type(' Bob!');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span><strong class="PlaygroundEditorTheme__textBold" data-lexical-text="true"> Bob!</strong></p>',
    );
    await assertSelection(page, {
      anchorOffset: 5,
      anchorPath: [0, 1, 0],
      focusOffset: 5,
      focusPath: [0, 1, 0],
    });

    await repeat(4, async () => {
      await page.keyboard.press('ArrowLeft');
    });

    await assertSelection(page, {
      anchorOffset: 1,
      anchorPath: [0, 1, 0],
      focusOffset: 1,
      focusPath: [0, 1, 0],
    });

    await page.keyboard.press('Backspace');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><span data-lexical-text="true">congrats</span><strong class="PlaygroundEditorTheme__textBold" data-lexical-text="true">Bob!</strong></p>',
    );
    await assertSelection(page, {
      anchorOffset: 0,
      anchorPath: [0, 1, 0],
      focusOffset: 0,
      focusPath: [0, 1, 0],
    });

    await page.keyboard.press('Space');

    if (browserName === 'firefox' && !isCollab) {
      await assertHTML(
        page,
        '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><span style="cursor: default;" class="keyword" data-lexical-text="true">congrats</span><strong class="PlaygroundEditorTheme__textBold" data-lexical-text="true"> Bob!</strong></p>',
      );
    } else {
      await assertHTML(
        page,
        '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span><span data-lexical-text="true"> </span><strong class="PlaygroundEditorTheme__textBold" data-lexical-text="true">Bob!</strong></p>',
      );
    }
    await assertSelection(page, {
      anchorOffset: 1,
      anchorPath: [0, 1, 0],
      focusOffset: 1,
      focusPath: [0, 1, 0],
    });
  });

  test('Can type "Everyone congrats!" where "Everyone " and "!" are bold', async ({
    page,
    isPlainText,
  }) => {
    test.skip(isPlainText);
    await focusEditor(page);

    await keyDownCtrlOrMeta(page);
    await page.keyboard.press('b');
    await keyUpCtrlOrMeta(page);

    await page.keyboard.type('Everyone ');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><strong class="PlaygroundEditorTheme__textBold" data-lexical-text="true">Everyone </strong></p>',
    );
    await assertSelection(page, {
      anchorOffset: 9,
      anchorPath: [0, 0, 0],
      focusOffset: 9,
      focusPath: [0, 0, 0],
    });

    await keyDownCtrlOrMeta(page);
    await page.keyboard.press('b');
    await keyUpCtrlOrMeta(page);

    await page.keyboard.type('congrats');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><strong class="PlaygroundEditorTheme__textBold" data-lexical-text="true">Everyone </strong><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span></p>',
    );
    await assertSelection(page, {
      anchorOffset: 8,
      anchorPath: [0, 1, 0],
      focusOffset: 8,
      focusPath: [0, 1, 0],
    });

    await page.keyboard.type('!');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><strong class="PlaygroundEditorTheme__textBold" data-lexical-text="true">Everyone </strong><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span><span data-lexical-text="true">!</span></p>',
    );
    await assertSelection(page, {
      anchorOffset: 1,
      anchorPath: [0, 2, 0],
      focusOffset: 1,
      focusPath: [0, 2, 0],
    });

    await page.keyboard.press('Backspace');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><strong class="PlaygroundEditorTheme__textBold" data-lexical-text="true">Everyone </strong><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span></p>',
    );
    await assertSelection(page, {
      anchorOffset: 8,
      anchorPath: [0, 1, 0],
      focusOffset: 8,
      focusPath: [0, 1, 0],
    });

    await keyDownCtrlOrMeta(page);
    await page.keyboard.press('b');
    await keyUpCtrlOrMeta(page);

    await page.keyboard.type('!');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><strong class="PlaygroundEditorTheme__textBold" data-lexical-text="true">Everyone </strong><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span><strong class="PlaygroundEditorTheme__textBold" data-lexical-text="true">!</strong></p>',
    );
    await assertSelection(page, {
      anchorOffset: 1,
      anchorPath: [0, 2, 0],
      focusOffset: 1,
      focusPath: [0, 2, 0],
    });

    await page.keyboard.press('Backspace');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><strong class="PlaygroundEditorTheme__textBold" data-lexical-text="true">Everyone </strong><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span></p>',
    );
    await assertSelection(page, {
      anchorOffset: 8,
      anchorPath: [0, 1, 0],
      focusOffset: 8,
      focusPath: [0, 1, 0],
    });

    await keyDownCtrlOrAlt(page);
    await page.keyboard.press('ArrowLeft');
    await keyUpCtrlOrAlt(page);

    await page.keyboard.press('Backspace');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><strong class="PlaygroundEditorTheme__textBold" data-lexical-text="true">Everyone</strong><span data-lexical-text="true">congrats</span></p>',
    );
    await assertSelection(page, {
      anchorOffset: 8,
      anchorPath: [0, 0, 0],
      focusOffset: 8,
      focusPath: [0, 0, 0],
    });

    await page.keyboard.press('Space');

    await assertHTML(
      page,
      '<p class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr" dir="ltr"><strong class="PlaygroundEditorTheme__textBold" data-lexical-text="true">Everyone </strong><span class="keyword" data-lexical-text="true" style="cursor: default;">congrats</span></p>',
    );
    await assertSelection(page, {
      anchorOffset: 9,
      anchorPath: [0, 0, 0],
      focusOffset: 9,
      focusPath: [0, 0, 0],
    });
  });
});