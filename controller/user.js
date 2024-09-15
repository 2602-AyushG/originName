const axios=require('axios');
const {getCommitsCategoryWise,getIssuesCategoryWise,compByForks,compByIssues,compByName,compByStars}=require('../utils/utils');
const User=require('../models/user');
const redis=require('redis');
var base64 = require('base-64');
var utf8 = require('utf8');
let seconds=3600;
let client;

module.exports.getHome=async (req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/profile');
    }
    res.render('home',
        {isLoggedIn:req.isAuthenticated()}
    );
}

module.exports.getUser=async (req,res,next)=>{
    let {username}=req.query;
    try{
            let user=await axios.get(`https://api.github.com/users/${username}`);
            user=user.data;
        if(req.isAuthenticated()){
            let user=await User.findOne({username:req.user.username});
            if(user.searchHistory.indexOf(username)==-1){
                user.searchHistory.unshift(username);
                let size=user.searchHistory.length;
                if(size>6){
                    user.searchHistory.splice(6,size-6);
                }
            }
            await user.save();
        }
        console.log(user);
            let repos=await axios.get(`https://api.github.com/users/${username}/repos`);
            repos=repos.data;
        res.render('repos',{
            repos:repos,
            user:user
        })
    }catch(err){
        res.send(err);
    }
}

module.exports.getRepo=async (req,res,next)=>{
    let {username,repo}=req.params;
    try{
        
            const { data } = await axios.get(`https://api.github.com/repos/${username}/${repo}/contents`);
            const readmeFile = data.find(d => d.name.toLowerCase() === 'readme.md');
            if (readmeFile) {
                const readmeResponse = await axios.get(readmeFile.url);
                readme = readmeResponse.data;
                
            }
        let commits;
        
            commits=await axios.get(`https://api.github.com/repos/${username}/${repo}/commits`);
            commits=commits.data;
            let issues=await axios.get(`https://api.github.com/repos/${username}/${repo}/issues`);
            issues=issues.data;

        var bytes = base64.decode(readme.content);
        var text = utf8.decode(bytes);
        console.log(text);
        res.render('repo_page',{
            repo,
            username,
            commits:getCommitsCategoryWise(commits.slice(0,10)),
            issues:getIssuesCategoryWise(issues),
            readme:text
        })
    }catch(err){
        res.send(err);
    }
}

module.exports.getContributors=async (req,res,next)=>{
    let {username,repo}=req.params;
    try{
        
            contributors=await axios.get(`https://api.github.com/repos/${username}/${repo}/contributors`);
            contributors=contributors.data;
            
        res.render('contributor',{
            contributors
        });
    }catch(err){
        res.send(err);
    }
}

module.exports.getCommitActivity=async (req,res,next)=>{
    let {username,repo}=req.params;
    try{
        
        res.render('commit_activity',{
            username,
            repo
        })
    }catch(err){
        res.send(err);
    }
}

module.exports.getProfile=async (req,res,next)=>{
    if(!req.isAuthenticated()) return res.redirect('/');
    try{
        let user=await User.findOne({username:req.user.username});
        let userSearched=user.searchHistory;
    res.render('profile',{
        user:req.user,
        userSearched:userSearched
    });
    }catch(err){
        res.send(err);
    }
}

module.exports.getRepoSortByStars=async (req,res,next)=>{
    let {username}=req.params;
    try{
        
            let user=await axios.get(`https://api.github.com/users/${username}`);
            user=user.data;
            

        
            let repos=await axios.get(`https://api.github.com/users/${username}/repos`);
            repos=repos.data;
            
        
        repos.sort(compByStars);
        res.render('repos',{
            repos,
            user
        })
    }catch(err){
        res.send(err);
    }   
}
module.exports.getRepoSortByForks=async (req,res,next)=>{
    let {username}=req.params;
    try{
        
            let user=await axios.get(`https://api.github.com/users/${username}`);
            user=user.data;
            
        let repos;
            repos=await axios.get(`https://api.github.com/users/${username}/repos`);
            repos=repos.data;
            
        repos.sort(compByForks);
        res.render('repos',{
            repos,
            user
        })
    }catch(err){
        res.send(err);
    }   
}
module.exports.getRepoSortByIssues=async (req,res,next)=>{
    let {username}=req.params;
    try{
        
            let user=await axios.get(`https://api.github.com/users/${username}`);
            user=user.data;
            
        
        
            let repos=await axios.get(`https://api.github.com/users/${username}/repos`);
            repos=repos.data;
           
        repos.sort(compByIssues);
        res.render('repos',{
            repos,
            user
        })
    }catch(err){
        res.send(err);
    }   
}
module.exports.getRepoSortByName=async (req,res,next)=>{
    let {username}=req.params;
    try{
        
            let user=await axios.get(`https://api.github.com/users/${username}`);
            user=user.data;
            
        
            let repos=await axios.get(`https://api.github.com/users/${username}/repos`);
            repos=repos.data;
            
        repos.sort(compByName);
        res.render('repos',{
            repos,
            user
        })
    }catch(err){
        res.send(err);
    }   
}