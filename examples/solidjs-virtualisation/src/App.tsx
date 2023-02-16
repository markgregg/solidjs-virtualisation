import SolidJsSelect from "solidjs-select";
import VirtualisationExample from './VirtualisationExample';
import './App.css';
import { applyTheme, themes, Themes } from './themes/themes';
import { createSignal, onMount } from 'solid-js';

const pages = ['Example', 'Back To Demos'];

const App = () => {
  const [themeName, setThemeName] = createSignal<string>(
    Themes.Plain.toString()
  );
  const [page, setPage] = createSignal<string>('Example');

  onMount(() => {
    applyTheme(Themes.Plain);
  });

  const setTheme = (theme: string[]) => {
    setThemeName(theme[0]);
    applyTheme(theme[0]);
  };

  const openPage = (page: string) => {
    if( page === 'Back To Demos') {
      window.location.href = "https://markgregg.github.io/demo-home/"; 
    } else {
      setPage(page);
    } 
  }

  return (
    <div class="frame">
      <div class="page">
        <div class='header'>
          <div class="heading">
            <h1 class="title">SolidJs-Virtualisation</h1>
            <p class="statement">
              A virtualisating container for Solidjs
            </p>
          </div>
          <div class="menu-bar">
            <div class="menu">
              {pages.map((pg) => (
                <div class="menu-item" onClick={() => openPage(pg)}>
                  {
                    ( pg === page()) 
                    ? <u><p class="menu-text">{pg}</p></u>
                    : <p class="menu-text">{pg}</p> 
                  }
                </div>
              ))}
            </div>
            <div class="theme">
              <SolidJsSelect
                maximumSelections={1}
                minimumSelections={1}
                selectType="dropdown"
                title="themes"
                choices={themes}
                selected={themeName()}
                onChange={setTheme}
                hideDivider
              />
            </div>
          </div>

        </div>
        <div 
          class={ "body" + (themeName()===Themes.Dark 
            ? " dark"
            : themeName()===Themes.Light
              ? " light"
              : themeName()===Themes.Blue
              ? " blue"
              : " plain")
          }
        >
          <div class="context">
            {
              (page() === 'Example' && <VirtualisationExample theme={themeName()} />)
            }
          </div>
          <div
            class="footer"
            style={{
              'background-color': 'var(--pageColor2)',
              color: 'var(--solidjsSelectFontColor)',
            }}
          >
            <p class="no-padding">Created by Mark Gregg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
