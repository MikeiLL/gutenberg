/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getColorValue, getColorClass, setColorValue } from './utils';
import { withEditorSettings } from '../editor-settings';

/**
 * Higher-order component, which handles color logic for class generation
 * color value, retrieval and color attribute setting.
 *
 * @param {Function} mapGetSetColorToProps Function that receives getColor, setColor, and props,
 *                                         and returns additional props to pass to the component.
 *
 * @return {Function} Higher-order component.
 */
export default ( mapGetSetColorToProps ) => createHigherOrderComponent(
	withEditorSettings(
		( settings, props ) => {
			const colors = get( settings, [ 'colors' ], [] );
			const getColor = ( colorValue, customColorValue, colorContext ) => {
				return {
					value: getColorValue( colors, colorValue, customColorValue ),
					class: getColorClass( colorContext, colorValue ),
				};
			};
			const setColor = ( colorAttribute, customColorAttribute, setAttributes ) => {
				return setColorValue( colors, colorAttribute, customColorAttribute, setAttributes );
			};
			return mapGetSetColorToProps( getColor, setColor, props );
		} ),
	'withColors'
);
