# Contrib

A dokumentum közepén van egy szép hosszú táblázat, ez az egyes "taskokat" tartalmazza, mindegyik szerkezete:

```html
<tr> <!-- Task feladata -->
    <td>
        <b>Task feladata</b>
    </td>
    <td>
        Task maga
    </td>
</tr>
```

A taskokat egyszerű inputfieldekkel, táblázatokkal és gombokkal lehet összedobálni.
Amennyiben egy résznek nincs értelme egy előző nélkül, legyen elrejtve:

```html
<div id="subTaskName" hidden>
    subtask
</div>
```

```js
document.querySelector("#subTaskName").hidden = false;
```

Ha egy táblázat mátrixot tartalmaz, legyen rajta egy matrix class.
Ha pedig eredményt, akkor egy result class (is).
Ezek a formázást rendezik el.
