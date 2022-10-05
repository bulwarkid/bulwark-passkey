import { Icon } from "./icon";

export class ChevronRightIcon extends Icon {
    render() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={this.props.color}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-chevron-right"
            >
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        );
    }
}
