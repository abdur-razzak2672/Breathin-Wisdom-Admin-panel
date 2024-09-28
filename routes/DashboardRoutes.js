import { v4 as uuid } from 'uuid';
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		link: '/'
	},
	{
		id: uuid(),
		title: 'Programs & Courses',
		grouptitle: true
	},
	{
		id: uuid(),
		title: 'Programs Category',
		icon: 'layers',
		children: [
			{ id: uuid(), link: '/program-category/category-list', name: 'Category List' },
			{ id: uuid(), link: '/program-category/add-category', name: 'Add Category'},
		]
	},
	{
		id: uuid(),
		title: 'Course Programs',
		icon: 'layers',
		children: [
			{ id: uuid(), link: '/course-program/all-courses', name: 'All Courses' },
			{ id: uuid(), link: '/course-program/add-course', name: 'Add Course'},
		]
	},
	{
		id: uuid(),
		title: 'Bundle Packages',
		icon: 'layers',
		children: [
			{ id: uuid(), link: '/course-package/all-packages', name: 'All Bundles' },
			{ id: uuid(), link: '/course-package/add-package', name: 'Add Bundle'},
		]
	},
	{
		id: uuid(),
		title: 'Course Content',
		icon: 'layers',
		children: [
			{ id: uuid(), link: '/course-content/all-contents', name: 'All Contents' },
			{ id: uuid(), link: '/course-content/add-content', name: 'Add Content'},
		]
	},	
	{
		id: uuid(),
		title: 'Authentication',
		icon: 'lock',
		children: [
			{ id: uuid(), link: '/authentication/sign-in', name: 'Sign In' },
			{ id: uuid(), link: '/authentication/sign-up', name: 'Sign Up' },
			{ id: uuid(), link: '/authentication/forget-password', name: 'Forget Password'}			
		]
	},
	{
		id: uuid(),
		title: 'Layouts',
		icon: 'layout',
		link: '/layouts/layout-vertical'
	},	
	{
		id: uuid(),
		title: 'UI COMPONENTS',
		grouptitle: true
	},	
	{
		id: uuid(),
		title: 'Components',
		icon: 'monitor',
		children: [
			{ id: uuid(), link: '/components/accordions', name: 'Accordions' },
			{ id: uuid(), link: '/components/alerts', name: 'Alerts' },
			{ id: uuid(), link: '/components/badges', name: 'Badges' },
			{ id: uuid(), link: '/components/breadcrumbs', name: 'Breadcrumbs' },
			{ id: uuid(), link: '/components/buttons', name: 'Buttons' },
			{ id: uuid(), link: '/components/button-group', name: 'ButtonGroup' },
			{ id: uuid(), link: '/components/cards', name: 'Cards' },
			{ id: uuid(), link: '/components/carousels', name: 'Carousel' },
			{ id: uuid(), link: '/components/close-button', name: 'Close Button' },
			{ id: uuid(), link: '/components/collapse', name: 'Collapse' },
			{ id: uuid(), link: '/components/dropdowns', name: 'Dropdowns' },
			{ id: uuid(), link: '/components/list-group', name: 'Listgroup' },
			{ id: uuid(), link: '/components/modal', name: 'Modal' },
			{ id: uuid(), link: '/components/navs', name: 'Navs' },
			{ id: uuid(), link: '/components/navbar', name: 'Navbar' },
			{ id: uuid(), link: '/components/offcanvas', name: 'Offcanvas' },
			{ id: uuid(), link: '/components/overlays', name: 'Overlays' },
			{ id: uuid(), link: '/components/pagination', name: 'Pagination' },
			{ id: uuid(), link: '/components/popovers', name: 'Popovers' },
			{ id: uuid(), link: '/components/progress', name: 'Progress' },
			{ id: uuid(), link: '/components/spinners', name: 'Spinners' },
			{ id: uuid(), link: '/components/tables', name: 'Tables' },
			{ id: uuid(), link: '/components/toasts', name: 'Toasts' },
			{ id: uuid(), link: '/components/tooltips', name: 'Tooltips' }
		]
	},	
	{
		id: uuid(),
		title: 'Menu Level',
		icon: 'corner-left-down',
		children: [
			{ 
				id: uuid(), 
				link: '#', 
				title: 'Two Level',
				children: [
					{ id: uuid(), link: '#', name: 'NavItem 1'},
					{ id: uuid(), link: '#', name: 'NavItem 2' }
				]
			},
			{ 
				id: uuid(), 
				link: '#', 
				title: 'Three Level',
				children: [
					{ 
						id: uuid(), 
						link: '#', 
						title: 'NavItem 1',
						children: [
							{ id: uuid(), link: '#', name: 'NavChildItem 1'},
							{ id: uuid(), link: '#', name: 'NavChildItem 2'}
						]
					},
					{ id: uuid(), link: '#', name: 'NavItem 2' }
				]
			}
		]
	},	
	{
		id: uuid(),
		title: 'Documentation',
		grouptitle: true
	},
	{
		id: uuid(),
		title: 'Docs',
		icon: 'clipboard',
		link: '/documentation'
	},
	{
		id: uuid(),
		title: 'Changelog',
		icon: 'git-pull-request',
		link: '/changelog'
	},
	{
		id: uuid(),
		title: 'Download',
		icon: 'download',
		link: 'https://codescandy.gumroad.com/l/dashui-nextjs'
	}
];

export default DashboardMenu;
