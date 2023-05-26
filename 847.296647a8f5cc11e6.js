"use strict";(self.webpackChunkthe_movie_db=self.webpackChunkthe_movie_db||[]).push([[847],{8847:(O,y,o)=>{o.r(y),o.d(y,{SearchModule:()=>I});var f=o(6895),m=o(3127),c=o(4006),i=o(8838),u=o(9653);const d=e=>e.search,F=(0,u.P1)(d,e=>e.loading),M=(0,u.P1)(d,e=>e.results),Z=(0,u.P1)(d,e=>e.meta);var t=o(4650),T=o(8515),$=o(7296),x=o(1572);function J(e,a){1&e&&(t.TgZ(0,"h1",10),t._uU(1," No Search Results Found "),t.qZA())}function U(e,a){if(1&e&&t._UZ(0,"app-card",11),2&e){const r=a.$implicit;t.Q6J("id",r.id)("title",r.title)("released",r.release_date)("voteAvg",10*r.vote_average)("voteCount",r.vote_count)("popularity",r.popularity)("imageUrl",r.poster_path?r.poster_path:"")}}function b(e,a){1&e&&(t.TgZ(0,"div",12),t._UZ(1,"mat-spinner"),t.qZA())}const Q=[{path:"",component:(()=>{class e{constructor(r,s,n){this.route=r,this.store=s,this.router=n,this.searchForm=new c.cw({search:new c.NI("")})}ngOnInit(){this.subscription=this.store.select(Z).subscribe(r=>{this.page=r.page,this.totalPages=r.total_pages,this.totalResults=r.total_results}),this.loading$=this.store.select(F),this.movies$=this.store.select(M),this.route.queryParamMap.subscribe(r=>{const s=r.get("search");s&&(this.store.dispatch((0,i.AQ)()),this.searchQuery=s,this.searchForm.setValue({search:s}),this.store.dispatch((0,i.$H)({payload:{page:1,query:s}})))})}handleSubmit(){this.router.navigate(["/search"],{queryParams:{search:this.searchForm.value.search}})}onScroll(){this.page+1<=this.totalPages&&this.store.dispatch((0,i.$H)({payload:{page:++this.page,query:this.searchQuery}}))}ngOnDestroy(){this.subscription.unsubscribe(),this.store.dispatch((0,i.AQ)())}}return e.\u0275fac=function(r){return new(r||e)(t.Y36(m.gz),t.Y36(u.yh),t.Y36(m.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-search-main"]],decls:16,vars:14,consts:[[1,"search","max-w-[82rem]","m-auto"],[1,"w-[80vw]","pt-10","relative","mx-auto"],[1,"specific__input-container",3,"formGroup","ngSubmit"],["formControlName","search","placeholder","Search for a movie",1,"discover__input","p-3","rounded-full","w-full","outline-none","text-gray-500","pr-[6.5rem]","border","border-primary"],["type","submit",1,"discover__search","bg-gradient-to-r","from-gradientGreen","to-gradientBlue","absolute","py-[0.85rem]","px-8","bottom-0","right-0","rounded-full","font-bold","text-white","hover:text-primary"],[1,"text-center","font-bold","text-3xl","py-6"],["class","text-center font-bold text-3xl py-10",4,"ngIf"],["infinite-scroll","",1,"search__container","text-primary","flex","flex-wrap","justify-center","gap-4","overflow-y-auto","pb-10",3,"infiniteScrollDistance","infiniteScrollThrottle","scrolled"],[3,"id","title","released","voteAvg","voteCount","popularity","imageUrl",4,"ngFor","ngForOf"],["class","h-[400px] w-[150px] flex flex-col items-center justify-center",4,"ngIf"],[1,"text-center","font-bold","text-3xl","py-10"],[3,"id","title","released","voteAvg","voteCount","popularity","imageUrl"],[1,"h-[400px]","w-[150px]","flex","flex-col","items-center","justify-center"]],template:function(r,s){if(1&r&&(t.TgZ(0,"div",0)(1,"div",1)(2,"form",2),t.NdJ("ngSubmit",function(){return s.handleSubmit()}),t._UZ(3,"input",3),t.TgZ(4,"button",4),t._uU(5," Search "),t.qZA()()(),t.TgZ(6,"h1",5),t._uU(7,"Search Results"),t.qZA(),t.YNc(8,J,2,0,"h1",6),t.ALo(9,"async"),t.ALo(10,"async"),t.TgZ(11,"div",7),t.NdJ("scrolled",function(){return s.onScroll()}),t.YNc(12,U,1,7,"app-card",8),t.ALo(13,"async"),t.YNc(14,b,2,0,"div",9),t.ALo(15,"async"),t.qZA()()),2&r){let n;t.xp6(2),t.Q6J("formGroup",s.searchForm),t.xp6(6),t.Q6J("ngIf",0===(null==(n=t.lcZ(9,6,s.movies$))?null:n.length)&&!t.lcZ(10,8,s.loading$)),t.xp6(3),t.Q6J("infiniteScrollDistance",0)("infiniteScrollThrottle",1e3),t.xp6(1),t.Q6J("ngForOf",t.lcZ(13,10,s.movies$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(15,12,s.loading$))}},dependencies:[T.A,$.Ry,x.Ou,c._Y,c.Fj,c.JJ,c.JL,c.sg,c.u,f.sg,f.O5,f.Ov],encapsulation:2}),e})()}];let R=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[m.Bz.forChild(Q),m.Bz]}),e})();var L=o(401),l=o(8776),C=o(8475),g=o(3900),v=o(9646),N=o(262),G=o(7129),H=o(1261),P=o(529);let A=(()=>{class e{constructor(r){this.http=r,this.baseUrl=`${H.N.baseUrl}search/movie?`}getSearch(r,s){return this.http.get(this.baseUrl+`page=${s}&include_adult=false&query=${r}`)}}return e.\u0275fac=function(r){return new(r||e)(t.LFG(P.eN))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac}),e})();var Y=o(1059);let B=(()=>{class e{constructor(r,s,n){this.actions$=r,this.searchHttp=s,this.snackBar=n,this.searchSuccess=(0,l.GW)(()=>this.actions$.pipe((0,l.l4)(C.I.SEARCH_SUCCESS),(0,g.w)(h=>(0,v.of)((0,G.C)({payload:h.payload.results}))))),this.searchAction=(0,l.GW)(()=>this.actions$.pipe((0,l.l4)(C.I.SEARCH_START),(0,g.w)(h=>this.searchHttp.getSearch(h.payload.query,h.payload.page).pipe((0,g.w)(p=>(0,v.of)((0,i._y)({payload:p}))),(0,N.K)(p=>{let S="Error loading results";return p.error.errors&&(S=p.error.errors[0]),p.error.status_message&&(S=p.error.status_message),this.snackBar.openSnackBar(S,!0),(0,v.of)((0,i.JP)())})))))}}return e.\u0275fac=function(r){return new(r||e)(t.LFG(l.eX),t.LFG(A),t.LFG(Y.o))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac}),e})();var E=o(8707);let I=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[A],imports:[E.m,x.Cq,c.UX,f.ez,R,u.Aw.forFeature("search",L.f),l.sQ.forFeature([B])]}),e})()}}]);