import {
	RouteReuseStrategy,
	ActivatedRouteSnapshot,
	DetachedRouteHandle,
} from '@angular/router';
import { customPath } from '../../utils/global.model';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
	private routeStore = new Map<string, DetachedRouteHandle>();

	shouldDetach(route: ActivatedRouteSnapshot): boolean {
		const path = route.routeConfig?.path as customPath;

		if (path) {
			return [
				customPath.coursesList,
				customPath.courseAdd,
				customPath.courseEdit,
			].includes(path);
		}
		return false;
	}
	store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
		if (route.routeConfig?.path) {
			this.routeStore.set(route.routeConfig.path, handle);
		}
	}
	shouldAttach(route: ActivatedRouteSnapshot): boolean {
		const path = route.routeConfig?.path as customPath;
		if (path) {
			return (
				[
					customPath.coursesList,
					customPath.courseAdd,
					customPath.courseEdit,
				].includes(path) && !!this.routeStore.get(path)
			);
		}
		return false;
	}
	retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
		const path = route.routeConfig?.path;
		return this.routeStore.get(path as string) as string;
	}
	shouldReuseRoute(
		future: ActivatedRouteSnapshot,
		curr: ActivatedRouteSnapshot
	): boolean {
		return future.routeConfig === curr.routeConfig;
	}
}
