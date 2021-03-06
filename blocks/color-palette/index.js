/**
 * External dependencies
 */
import classnames from 'classnames';
import { ChromePicker } from 'react-color';
import { map } from 'lodash';

/**
 * WordPress dependencies
 */
import { Dropdown, Tooltip } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';
import { withEditorSettings } from '../editor-settings';

export function ColorPalette( { colors, disableCustomColors = false, value, onChange } ) {
	function applyOrUnset( color ) {
		return () => onChange( value === color ? undefined : color );
	}
	const customColorPickerLabel = __( 'Custom color picker' );
	return (
		<div className="blocks-color-palette">
			{ map( colors, ( { color, name } ) => {
				const style = { color: color };
				const className = classnames( 'blocks-color-palette__item', { 'is-active': value === color } );

				return (
					<div key={ color } className="blocks-color-palette__item-wrapper">
						<Tooltip text={ name || sprintf( __( 'Color code: %s' ), color ) }>
							<button
								type="button"
								className={ className }
								style={ style }
								onClick={ applyOrUnset( color ) }
								aria-label={ name ? sprintf( __( 'Color: %s' ), name ) : sprintf( __( 'Color code: %s' ), color ) }
								aria-pressed={ value === color }
							/>
						</Tooltip>
					</div>
				);
			} ) }

			{ ! disableCustomColors &&
				<Dropdown
					className="blocks-color-palette__item-wrapper blocks-color-palette__custom-color"
					contentClassName="blocks-color-palette__picker "
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Tooltip text={ customColorPickerLabel }>
							<button
								type="button"
								aria-expanded={ isOpen }
								className="blocks-color-palette__item"
								onClick={ onToggle }
								aria-label={ customColorPickerLabel }
							>
								<span className="blocks-color-palette__custom-color-gradient" />
							</button>
						</Tooltip>
					) }
					renderContent={ () => (
						<ChromePicker
							color={ value }
							onChangeComplete={ ( color ) => onChange( color.hex ) }
							style={ { width: '100%' } }
							disableAlpha
						/>
					) }
				/>
			}

			<button
				className="button-link blocks-color-palette__clear"
				type="button"
				onClick={ () => onChange( undefined ) }
			>
				{ __( 'Clear' ) }
			</button>
		</div>
	);
}

export default withEditorSettings(
	( settings, props ) => ( {
		colors: props.colors || settings.colors,
		disableCustomColors: props.disableCustomColors !== undefined ?
			props.disableCustomColors :
			settings.disableCustomColors,
	} )
)( ColorPalette );
