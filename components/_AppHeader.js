import { MenuIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { onSearchSubmit } from 'z/helpers/functions';
import { useDropdown } from 'z/helpers/hooks';
import { Dropdown, DropdownMenu, DropdownItem } from 'z/layouts';
import AppHeaderSearchTypes from './_AppHeaderSearchTypes';
import AppHeaderTopics from './_AppHeaderTopics';
import style from './css/appHeader.module.scss';

const searchPathRE = /^\/search\/\w+\/\[q\]/;

/**
 * @param {object} props
 * @param {import('jsdocs/typedefs').Topic[]} [props.topics]
 */
function AppHeader(props) {
  const { topics = [] } = props;

  const router = useRouter();
  const { pathname, query } = router;

  const q = query?.q ?? '';
  const [qValue, setQValue] = useState(q);
  const { isDropdownActive, toggleDropdown } = useDropdown();

  useEffect(() => {
    setQValue(q);
  }, [q]);

  let searchTypesElement = null;
  if (searchPathRE.test(pathname)) {
    searchTypesElement = <AppHeaderSearchTypes />;
  }

  return (
    <header className={style.main}>
      <nav className="is-flex">
        <div className={style.item}>
          <Link href="/">
            <a className={style.brand}>
              <img className={style.brandLogo} src="/logo-light-64x64.png" alt="Logo" />
              <div className={style.brandText}>
                <h1 className="title is-6 has-text-weight-bold mb-0">Unsplash-cloned</h1>
                <h3 className="title is-7 has-text-weight-medium">by Zinglecode</h3>
              </div>
            </a>
          </Link>
        </div>
        <div className={style.itemExpand}>
          <div className={style.searchOuter}>
            <div className={`field ${style.searchInner}`}>
              <form action="#" onSubmit={event => onSearchSubmit(event, router, qValue)}>
                <div className="control">
                  <input
                    className={`input is-rounded ${style.searchInput}`}
                    type="search"
                    placeholder="Search free high-resolution photos"
                    value={qValue}
                    onChange={event => setQValue(event.target.value)}
                  />
                  <button className={`button is-ghost ${style.searchButton}`} type="submit">
                    <span className="icon is-left">
                      <SearchIcon width={20} height={20} />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={`${style.item} pr-2 is-hidden-mobile`}>
          <Link href="/about">
            <a className={style.link}>
              <span>About</span>
            </a>
          </Link>
          <a className={style.link} href="https://github.com/potchangelo/next-unsplash" target="_blank">
            <span>Github</span>
          </a>
        </div>
        <div className={`${style.item} is-hidden-tablet`}>
          <div className={` ${style.link}`} onClick={toggleDropdown}>
            <Dropdown isActive={isDropdownActive}>
              <span className="icon">
                <MenuIcon />
              </span>
              <DropdownMenu>
                <DropdownItem type="next-link" href="/about" linkClass="has-text-white has-text-weight-medium">
                  <span>About</span>
                </DropdownItem>
                <DropdownItem
                  type="ext-link"
                  href="https://github.com/potchangelo/next-unsplash"
                  linkClass="has-text-white has-text-weight-medium"
                >
                  <span>Github</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </nav>
      <AppHeaderTopics topics={topics} />
      {searchTypesElement}
    </header>
  );
}

export default AppHeader;
